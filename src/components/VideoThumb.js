import React, {Component, PropTypes} from 'react';
import obj from 'object-path';

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

    const {videoId, userId, moveUp, moveDown} = this.props;
    const {title} = this.state;

    return (
      <div className='thumbnail' style={{maxWidth: 640, margin: '1em auto'}}>

        <img src={`http://img.youtube.com/vi/${videoId}/sddefault.jpg`}/>

        <div className='caption'>

          <h3>
            <a target='_blank'
               href={`https://youtube.com/watch?v=${videoId}`}>

              {title || ''}

            </a>
          </h3>

          <p>

            <div className='btn-group'>

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

            </div>


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
