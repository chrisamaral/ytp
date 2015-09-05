export default () => {

  const playlistId = ytp.playlistId();
  const video = ytp.videoInfo();

  ytp.db
    .child(`playlist/${playlistId}/video/${video.id}`)
    .setWithPriority(ytp.user.uid, Firebase.ServerValue.TIMESTAMP);

};
