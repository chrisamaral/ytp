import React, {Component} from 'react';
import async from 'async';
import values from 'object-values';
import assign from 'object-assign';
import find from 'array-find';
import obj from 'object-path';
import Item from './Item.js';

const MAX = 10 * 60;
const MARGIN = 11 * 60;

class Preview extends Component {

  constructor() {

    super();
    this.state = {
      playlist: [],
      ini: new Date(0)
    };

  }

  componentDidMount() {

    const cachedUsers = {};
    const cachedVideos = {};
    const getUser = (id, callback) => {

      if (id === ytp.user.uid) return callback(null, ytp.user);

      if (cachedUsers[id]) return callback(null, cachedUsers[id]);

      ytp.db
        .child(`user/${id}`)
        .once('value', snap => {

          cachedUsers[id] = snap.val();
          callback(null, cachedUsers[id]);

        });

    };

    const getVideo = (id, callback) => {

      if (cachedVideos[id]) return callback(null, cachedVideos[id]);

      ytp.db
        .child(`video/${id}`)
        .once('value', snap => {

          cachedVideos[id] = cachedVideos[id] || snap.val();
          callback(null, cachedVideos[id]);

        });

    };

    const randomChar = () => Math.random().toString(36)[2];

    const sortByChar = index => (a, b) => {

      const aKey = a.sortToken[index] || randomChar();
      const bKey = b.sortToken[index] || randomChar();

      if (aKey === bKey) return 0;

      return aKey < bKey ? -1 : 1;

    };

    const makeList = ({users, videos}) => {

      const lists = [];

      users.forEach((me, index) => {

        const user = find(lists, u => u.uid === me.uid) ||
          assign({
            videos: [],
            sortToken: obj.get(me, 'facebook.cachedUserProfile.name', '')
              .replace(/\W/g, '')
              .toLowerCase()
          }, me);

        if (!user.videos.length) lists.push(user);

        user.videos
          .push(videos[index]);

      });

      const playlist = [];

      let lastLength = playlist.length;
      let index;
      let duration;
      let user;
      let video;
      let rounds = 0;

      const nextUser = () => {

        index++;
        duration = 0;

      };

      do {

        lastLength = playlist.length;
        index = 0;
        duration = 0;

        lists.sort(sortByChar(rounds));

        while (index < lists.length) {

          user = lists[index];
          video = user.videos[0];

          if (!video || duration + video.duration > MARGIN) {

            nextUser();
            continue;

          }

          playlist.push(assign({user}, video));
          duration += video.duration;
          user.videos.shift();

          if (duration >= MAX) {

            nextUser();

          }

        }

        rounds++;

      } while (lastLength < playlist.length);

      this.setState({playlist});

    };

    const refresh = this.refresh = snap => {

      if (!snap.exists()) return this.setState({playlist: []});

      const ls = snap.val();

      async.parallel({

        users: callback => async.map(values(ls), getUser, callback),
        videos: callback => async.map(Object.keys(ls), getVideo, callback)

      }, (err, results) => err ? console.log(err) : makeList(results));

    };

    ytp.db
      .child(`playlist/${ytp.playlistId()}/admin`)
      .once('value', snap =>
        this.setState({
          isAdmin: snap.val() === ytp.user.uid
        }));

    ytp.db
      .child(`playlist/${ytp.playlistId()}/ini`)
      .once('value', snap =>
        this.setState({
          ini: new Date(snap.val())
        }));

    ytp.db
      .child(`playlist/${ytp.playlistId()}/video`)
      .on('value', refresh);

  }

  componentWillUnmount() {

    ytp.db
      .child(`playlist/${ytp.playlistId()}/video`)
      .off('value', this.refresh);

  }

  render() {

    const {playlist, isAdmin, ini} = this.state;

    let duration = 0;
    const when = dur => {

      const t = new Date(ini.getTime() + duration * 1000);
      duration += dur;
      return t;

    };

    return (
      <div>
        <h4>lista final</h4>
        <hr/>
        {playlist.map(video =>
          <Item key={video.id} startAt={when(video.duration)} isAdmin={isAdmin} {...video} />)}
      </div>
    );

  }

}

export default Preview;
