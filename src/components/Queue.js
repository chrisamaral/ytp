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
          ({videoId, userId}, index) => (
            <VideoThumb
              key={videoId}
              moveUp={index > 0 && this.moveUp(videoId)}
              moveDown={index < videos.length - 1 && this.moveDown(videoId)}
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

  swap(videoA, videoB) {

    const a = this.db.child(videoA);
    const b = this.db.child(videoB);

    const replace = priority => b.once('value',
        snap => a.setPriority(snap.getPriority()) + b.setPriority(priority)
    );

    a.once('value', snap => replace(snap.getPriority()));

  }

  moveUp(videoId) {

    return () => {

      const {videos} = this.state;
      const index = this.indexOf(videoId);

      this.swap(videos[index].videoId, videos[index - 1].videoId);

    };

  }

  moveDown(videoId) {

    return () => {

      const {videos} = this.state;
      const index = this.indexOf(videoId);

      this.swap(videos[index].videoId, videos[index + 1].videoId);

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
