export default () => {

  const playlistId = ytp.playlistId();
  const video = ytp.videoInfo();

  if (video.duration > 10 * 60) return ytp.emit('video-too-long');

  ytp.db
    .child(`playlist/${playlistId}/video/${video.id}`)
    .setWithPriority(ytp.user.uid, Firebase.ServerValue.TIMESTAMP);

};
