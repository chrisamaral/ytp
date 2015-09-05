import React, {Component, PropTypes} from 'react';
import obj from 'object-path';
import pretty from 'pretty-ms';

class VideoThumb extends Component {

  constructor() {

    super();
    this.state = {};

  }

  componentDidMount() {

    const {videoId} = this.props;

    this.update = snap => snap.exists() && this.setState(snap.val());

    this.db = ytp.db.child(`video/${videoId}`);
    this.db.on('value', this.update);

  }

  componentWillUnmount() {

    this.db.off('value', this.update);

  }

  render() {

    const {videoId, moveUp, moveDown} = this.props;
    const {title, duration} = this.state;

    return (

      <div className='thumbnail text-left'
           style={{maxWidth: 480, margin: '1em auto'}}>

        <h4 style={{position: 'absolute', margin: '.3em 0 0 .3em'}}>

          <span className='label label-info'>
            {pretty((duration || 0) * 1000)}
          </span>

        </h4>

        <a target='_blank' href={`https://youtube.com/watch?v=${videoId}`}>

          <img src={`http://img.youtube.com/vi/${videoId}/hqdefault.jpg`}/>

        </a>

        <div className='caption'>

          <h5>
            {` ${title || ''}`}
          </h5>

          <p className='text-center'>

            <span className='btn-group'>

              <a className={`btn btn-default ${moveUp ? '' : 'disabled'}`} onClick={moveUp}>
                <i className='glyphicon glyphicon-chevron-up'/>
              </a>

              <a className={'btn btn-warning'}
                 onClick={this.remove.bind(this)}>
                remover
              </a>

              <a className={`btn btn-default ${moveDown ? '' : 'disabled'}`} onClick={moveDown}>
                <i className='glyphicon glyphicon-chevron-down'/>
              </a>

            </span>


          </p>

        </div>

      </div>
    );

  }

  remove() {

    ytp.db
      .child(`playlist/${ytp.playlistId()}/video/${this.props.videoId}`)
      .remove();

  }

}

VideoThumb.propTypes = {
  videoId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  moveUp: PropTypes.any,
  moveDown: PropTypes.any
};

export default VideoThumb;
