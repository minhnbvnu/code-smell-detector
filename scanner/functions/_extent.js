function _extent(_) {

  if (arguments.length) {

    extent = _;

    var pos = audio.currentTime / audio.duration;

    if (pos > extent[1] || audio.duration * extent[0] - audio.currentTime > 0.2 || !isPlaying()) {
      pause(extent[0] * audio.duration);
    }

    minimap.time(pos);

  } else {
    return extent;
  }
}