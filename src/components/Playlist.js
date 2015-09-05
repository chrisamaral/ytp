import React, {Component} from 'react';
import Editor from './Editor.js';
import Metadata from './Metadata.js';
import Preview from './Preview.js';

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

            <Preview />

          </aside>

        </div>

      </div>
    );

  }

}

export default Playlist;
