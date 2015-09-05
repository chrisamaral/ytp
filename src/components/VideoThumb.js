import React, {Component, PropTypes} from 'react';
import obj from 'object-path';

class VideoThumb extends Component {

  constructor() {

    super();
    this.state = {};

  }

  componentDidMount() {

    const {videoId} = this.props;

    this.update = snap => snap.exists() && this
      .setState(snap.val());

    this.db = ytp.db.child(`video/${videoId}`);
    this.db.on('value', this.update);

  }

  componentWillUnmount() {

    this.db.off('value', this.update);

  }

  render() {

    const {videoId, moveUp, moveDown} = this.props;
    const {title} = this.state;

    return (
      <div className='thumbnail'>

        <img src={`http://img.youtube.com/vi/${videoId}/sddefault.jpg`} />

        <div className='caption'>

          <h3>{title || ''}</h3>

          <p>

            {moveUp && (<a className='btn btn-default' onClick={moveUp}>
              -
            </a>)}

            {moveDown && (<a className='btn btn-default' onClick={moveDown}>
              +
            </a>)}

          </p>

        </div>

      </div>
    );

  }

}

VideoThumb.propTypes = {
  videoId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  moveUp: PropTypes.any,
  moveDown: PropTypes.any
};

export default VideoThumb;
