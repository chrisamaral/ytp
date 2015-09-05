import React, {Component} from 'react';
import qs from 'qs';
import enqueueVideo from '../enqueue-video.js';
import Queue from './Queue.js';

function enqueueAndStop(e) {

  if (e.data !== YT.PlayerState.PLAYING) return;

  enqueueVideo();
  ytp.player.pauseVideo();
  ytp.removeListener('yt-state-change', enqueueAndStop);

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

            <input name='videoUrl'
                   placeholder='http://yotube.com/watch?v=videoxyz'
                   required
                   type='url'
                   className='form-control'/>

          </div>
        </form>
        <Queue />
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

    ytp.on('yt-state-change', enqueueAndStop);
    ytp.player.loadVideoById(videoId);


  }

}

export default Editor;
