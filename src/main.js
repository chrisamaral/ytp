import {EventEmitter} from 'events';
import qs from 'qs';
import React from 'react';
import App from './components/App.js';
import load from './load.js';

const {Firebase} = global;
const ytp = global.ytp = new EventEmitter();

ytp.db = new Firebase('https://ytp.firebaseio.com');
ytp.playlistId = () => qs.parse(location.search.substr(1)).p;

ytp.db.onAuth(authData => {

  ytp.user = authData;
  ytp.emit('auth-change');

  if (authData) {

    ytp.emit('logged-in', authData);

  } else {

    ytp.emit('logged-out');

  }

});

ytp.on('logged-in', user => ytp.db
  .child(`user/${user.uid}`).set(user));

ytp.on('yt-state-change', ev => {

  if (ev.data !== YT.PlayerState.PLAYING) return;

  const info = ytp.player.getVideoData();

  if (!info) return;

  const id = info.video_id;
  const {title} = info;
  const duration = ytp.player.getDuration();

  ytp.db.child(`video/${id}`).set({
    id,
    title,
    duration
  });

});

load.fb();
load.yt();

React.render(<App />, document.getElementById('application'));
