import React, {Component} from 'react';
import forEach from 'for-each';
import VideoThumb from './VideoThumb.js';

const filter = videos => {

  const ls = [];

  forEach(videos, (userId, videoId) => userId === ytp
    .user.uid && ls.push(videoId));

  return ls;

};

class Queue extends Component {

  constructor() {

    super();
    this.state = {videos: []};

  }

  componentDidMount() {

    this.update = snap => {

      if (!snap.exists()) return this.setState({videos: []});

      const myVideos = filter(snap.val());

      this.setState(
        {videos: this.state.videos.slice(0, myVideos.length)},
        () => this.read(myVideos.length)
      );

    };

    this.db = ytp.db.child(`playlist/${ytp.playlistId()}/video`);
    this.db.on('value', this.update);

  }

  componentWillUnmount() {

    this.db.off('value', this.update);

  }

  render() {

    const {videos} = this.state;

    return (
      <div className='text-center'>

        {videos.map(
          ({videoId, userId}) => (
            <VideoThumb
              key={videoId}
              moveUp={this.moveUp(videoId)}
              moveDown={this.moveDown(videoId)}
              videoId={videoId}
              userId={userId}/>
          )
        )}

      </div>
    );

  }

  indexOf(videoId) {

    const {videos} = this.state;
    let index = -1;

    for (let i = 0; i < videos.length; i++) {

      if (videos[i].videoId === videoId) {

        index = i;
        break;

      }

    }

    return index;

  }

  swap(videoA, videoB, offset = 0) {

    const a = this.db.child(videoA);
    const b = this.db.child(videoB);

    if (offset !== 0) {

      return b.once('value', snap => a
        .setPriority(snap.getPriority() + offset));

    }

    const replace = priority => b.once('value',
        snap => a.setPriority(snap.getPriority()) + b.setPriority(priority)
    );

    a.once('value', snap => replace(snap.getPriority()));

  }

  moveUp(videoId) {

    return () => {

      const {videos} = this.state;
      const index = this.indexOf(videoId);
      const previous = videos[index - 1] ? index + 1 : videos.length - 1;

      this.swap(videos[index].videoId, videos[previous].videoId, previous === videos.length - 1 ? 1 : 0);

    };

  }

  moveDown(videoId) {

    return () => {

      const {videos} = this.state;
      const index = this.indexOf(videoId);
      const next = videos[index + 1] ? index + 1 : 0;

      this.swap(videos[index].videoId, videos[next].videoId, next === 0 ? -1 : 0);

    };

  }

  read(count) {

    const videos = [];
    const ordered = this.db.orderByPriority();
    const save = () => this.setState({videos});

    function add(snap) {

      const userId = snap.val();

      if (userId !== ytp.user.uid) return;

      videos.push({
        videoId: snap.key(),
        userId: snap.val()
      });

      if (videos.length < count) return;

      ordered.off('child_added', add);
      save();

    }

    ordered.on('child_added', add);

  }

}

export default Queue;
