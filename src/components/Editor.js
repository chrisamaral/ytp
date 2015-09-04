import React, {Component} from 'react';
import qs from 'qs';

function stopOnceLoaded(e) {

  if (e.data !== YT.PlayerState.PLAYING) return;

  ytp.player.pauseVideo();
  ytp.removeListener('yt-state-change', stopOnceLoaded);

}

class Editor extends Component {

  render() {

    return (
      <div>
        <form onSubmit={this.enqueue.bind(this)}>
          <div className='form-group'>
            <label>
              url do novo vídeo
            </label>
            <input name='videoUrl' type='url' required className='form-control'/>
          </div>
        </form>
      </div>
    );

  }

  enqueue(e) {

    e.preventDefault();

    const videoUrl = e.target.elements.videoUrl.value;

    let videoId;

    if (videoUrl.indexOf('?')) {

      const query = qs.parse(videoUrl.substr(videoUrl.indexOf('?') + 1));
      videoId = query && query.v;

    }

    if (!videoId) videoId = videoUrl.split('/').pop();

    e.target.elements.videoUrl.value = '';



    ytp.on('yt-state-change', stopOnceLoaded);
    ytp.player.loadVideoById(videoId);


  }

}

export default Editor;
