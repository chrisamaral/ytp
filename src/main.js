import {EventEmitter} from 'events';
import qs from 'qs';
import React from 'react';
import App from './components/App.js';

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

global.fbAsyncInit = () => {

  FB.init({
    appId: '119146078437268',
    xfbml: true,
    version: 'v2.4'
  });

  ytp.fbReady = true;
  ytp.emit('fb-ready');

};

(function (d, s, id) {

  var js, fjs = d.getElementsByTagName(s)[0];

  if (d.getElementById(id)) return;

  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);

}(document, 'script', 'facebook-jssdk'));

React.render(<App />, document.getElementById('application'));
