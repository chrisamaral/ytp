import React, {Component, PropTypes} from 'react';
import Duration from './Duration.js';
import obj from 'object-path';

class Item extends Component {

  render() {

    const {id, title, duration, startAt, isAdmin} = this.props;
    const user = obj.get.bind(obj, this.props.user);

    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='row'>

            <div className='col-sm-4'>
              <Duration value={duration || 0}/>
              <img className='img-responsive' src={`http://img.youtube.com/vi/${id}/mqdefault.jpg`}/>
            </div>

            <div className='col-sm-8'>

              <h5>
                <a target='_blank' href={`http://youtube.com/watch?v=${id}`}>{title}</a>
              </h5>

              <dl className='dl-horizontal'>
                <dt>por</dt>
                <dd>{user('facebook.cachedUserProfile.first_name', '')}</dd>
                <dt>estimativa</dt>
                <dd>{startAt.toLocaleTimeString()}</dd>
              </dl>

              {isAdmin && (
                <a className='btn btn-warning pull-right'
                   onClick={this.remove.bind(this)}>
                  remover
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );

  }

  remove() {

    ytp.db.child(`playlist/${ytp.playlistId()}/video/${this.props.id}`).remove();

  }

}

Item.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  startAt: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
};

export default Item;
