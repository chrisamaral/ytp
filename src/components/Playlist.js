import React from 'react';
import FireComponent from './FireComponent.js';

class Playlist extends FireComponent {

  constructor() {

    super();

    const id = ytp.playlistId();
    this.sync(`playlist/${id}/name`);

  }

  onChangeName(ev) {

    this.setState({name: ev.target.value});

  }

  render() {

    return (
      <div className='container-fluid'>
        <div className='row'>

          <form className='col-sm-7'>

            <div className='form-group'>
              <input className='form-control' value={this.state.name}
                     onChange={this.onChangeName.bind(this)}/>

            </div>

          </form>

        </div>
      </div>
    );

  }

}

export default Playlist;
