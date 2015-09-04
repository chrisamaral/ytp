import React, {Component} from 'react';
import CreatePlaylist from './CreatePlaylist.js';
import Playlist from './Playlist.js';

class Content extends Component {

  render() {

    return (
      <section>

        {ytp.playlistId()
          ? <Playlist />
          : <CreatePlaylist />
        }
      </section>
    );

  }

}

export default Content;
