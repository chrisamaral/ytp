import {EventEmitter} from 'events';
import qs from 'qs';
import React from 'react';
import App from './components/App.js';

const F = global.Firebase;
const ytp = new EventEmitter();

ytp.db = new Firebase('https://ytp.firebaseio.com');
ytp.playlistId = () => qs.parse(location.search.substr(1)).p;

global.ytp = ytp;

global.fbAsyncInit = () => {

  FB.init({
    appId: '119146078437268',
    xfbml: true,
    version: 'v2.4'
  });

  ytp.emit('fb-loaded');

};

(function (d, s, id) {

  var js, fjs = d.getElementsByTagName(s)[0];

  if (d.getElementById(id)) return;

  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);

}(document, 'script', 'facebook-jssdk'));



React.render(<App />, document.getElementById('container'))
