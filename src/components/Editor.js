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

  constructor() {

    super();
    this.state = {};

  }

  componentDidMount() {

    this.showError = () => this.setState({error: true});
    ytp.on('video-too-long', this.showError);

  }

  componentWillUnmount() {

    ytp.removeListener('video-too-long', this.showError);

  }

  render() {

    return (
      <div>

        <h4>sua lista</h4>
        <hr/>

        <form className='row' onSubmit={this.enqueue.bind(this)}>

          <div className='form-group col-md-10 col-sm-8'>

            <input name='videoUrl'
                   placeholder='http://yotube.com/watch?v=videoxyz'
                   required
                   type='url'
                   className='form-control'/>

          </div>

          <div className='col-md-2 col-sm-4'>

            <button className='btn btn-primary btn-block' type='submit'>
              adicionar
            </button>

          </div>

        </form>

        {this.state.error && (

          <div className='alert alert-danger alert-dismissible'>

            <a className='close' onClick={() => this.setState({error: false})}>
              &times;
            </a>

            Seu vídeo não pode ter mais de 10 minutos

          </div>
        )}

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
