function fb() {

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

}

function yt() {

  global.onYouTubeIframeAPIReady = () => {

    ytp.player = new YT.Player('yt-player', {
      height: window.innerHeight,
      width: window.innerWidth - 30,
      videoId: '2zPWckFtlAk',
      events: {
        onReady: ytp.emit.bind(ytp, 'yt-ready'),
        onStateChange: ytp.emit.bind(ytp, 'yt-state-change')
      }
    });

  };

  const yScript = document.createElement('script');

  yScript.src = 'https://www.youtube.com/iframe_api';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(yScript, firstScript);

}

export default {yt, fb};
