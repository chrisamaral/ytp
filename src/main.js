import {EventEmitter} from 'events';

const F = global.Firebase;
const ytp = new EventEmitter();

ytp.db = new Firebase('https://ytp.firebase.io');

global.ytp = ytp;

global.fbAsyncInit = () => {

  FB.init({
    appId: '119146078437268',
    xfbml: true,
    version: 'v2.4'
  });

};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
