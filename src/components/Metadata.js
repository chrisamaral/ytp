import React from 'react';
import FireComponent from './FireComponent.js';

class Metadata extends FireComponent {

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
      <form className='row'>

        <div className='form-group col-sm-7'>
          <label>nome da parada</label>
          <input className='form-control'
                 value={this.state.name}
                 onChange={this.onChange('name')}/>
        </div>

        <div className='form-group col-sm-5'>
          <label>quando vai rolar</label>
          <input className='form-control'
                 type='datetime-local'
                 value={this.state.ini}
                 onChange={this.onChange('ini')}/>
        </div>

      </form>
    );

  }

}

export default Metadata;
