import React, {Component} from 'react';
import SelectPlaylist from './SelectPlaylist.js';

class Content extends Component {

  render() {

    return (
      <section>

        {ytp.playlistId()
          ? <p>Oi</p>
          : <SelectPlaylist />
        }
      </section>
    );

  }

}

export default Content;
