function setup_exclusive_audio_video_playback() {
  document.addEventListener('play', function(e) {

    var tags = ["audio","video"];

    for (var i=0; i<tags.length; i++) {
      var tag = tags[i];
      var players = document.getElementsByTagName(tag);
      for (var i = 0, len = players.length; i < len; i++) {
        if (players[i] != e.target) {
          players[i].pause();
        }
      }
    }
  }, true);
}