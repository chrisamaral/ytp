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

  function inserFBTag(doc, tag, id) {

    let js;
    const fjs = doc.getElementsByTagName(tag)[0];

    if (doc.getElementById(id)) return;

    js = doc.createElement(tag);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);

  }

  inserFBTag(document, 'script', 'facebook-jssdk');

}

function yt() {

  global.onYouTubeIframeAPIReady = () => {

    ytp.player = new YT.Player('yt-player', {
      height: window.innerHeight,
      width: window.innerWidth - 30,
      videoId: '2zPWckFtlAk',
      events: {
        onReady: () => ytp.player.mute(),
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
