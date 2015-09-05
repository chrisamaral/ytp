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

ytp.videoInfo = () => {

  const info = ytp.player.getVideoData();

  return {
    id: info.video_id,
    title: info.title,
    duration: ytp.player.getDuration()
  };

};

ytp.on('yt-state-change', ev => {

  if (ev.data !== YT.PlayerState.PLAYING) return;

  const video = ytp.videoInfo();

  ytp.db
    .child(`video/${video.id}`)
    .set(video);

});

load.fb();
load.yt();

React.render(<App />, document.getElementById('application'));
