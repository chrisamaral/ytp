import React from 'react';
import FireComponent from './FireComponent.js';

class Playlist extends FireComponent {

  constructor() {

    super();

    const id = ytp.playlistId();
    this.sync(`playlist/${id}/name`);
    this.sync(`playlist/${id}/ini`);

  }


  onChange(name) {

    return ev => this.setState({[name]: ev.target.value});

  }

  render() {

    return (
      <div className='container-fluid'>
        <div className='row'>

          <form>

            <div className='form-group col-sm-4'>
              <label>nome da parada</label>
              <input className='form-control'
                     value={this.state.name}
                     onChange={this.onChange('name')}/>


            </div>

            <div className='form-group col-sm-3'>
              <label>quando vai rolar</label>
              <input className='form-control'
                     type='datetime-local'
                     value={this.state.ini}
                     onChange={this.onChange('ini')}/>

            </div>

          </form>

        </div>
      </div>
    );

  }

}

export default Playlist;
