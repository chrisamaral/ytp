import React, {Component} from 'react';
import Editor from './Editor.js';
import Metadata from './Metadata.js';

class Playlist extends Component {

  render() {

    return (
      <div className='container-fluid'>
        <div className='row'>

          <div className='col-sm-7'>

            <Metadata />
            <Editor />

          </div>

          <aside className='col-sm-5'>
            lista final
          </aside>


        </div>

      </div>
    );

  }

}

export default Playlist;
