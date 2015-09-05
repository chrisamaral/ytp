import React, {Component} from 'react';
import debounce from 'debounce';

class Metadata extends Component {

  constructor() {

    super();
    this.state = {};

  }

  componentDidMount() {

    const id = ytp.playlistId();
    this.db = {
      name: ytp.db.child(`playlist/${id}/name`),
      ini: ytp.db.child(`playlist/${id}/ini`)
    };

    this.updateName = snap => this.setState({name: snap.val()});
    this.updateIni = snap => this.setState({ini: snap.val()});

    this.db.name.set = debounce(this.db.name.set.bind(this.db.name), 300);
    this.db.ini.set = debounce(this.db.ini.set.bind(this.db.ini), 300);

    this.db.name.on('value', this.updateName);
    this.db.ini.on('value', this.updateIni);

  }

  componentWillUnmount() {

    this.db.name.off('value', this.updateName);
    this.db.ini.off('value', this.updateIni);

  }

  onChange(name) {

    return ev => this.setState(
      {[name]: ev.target.value},
      this.db[name].set(ev.target.value)
    );

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
