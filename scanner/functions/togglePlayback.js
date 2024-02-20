function togglePlayback() {
  clearTimeout(fragmentTimer);
  if (video.elt.paused) {
    video.play();
  } else {
    video.pause();
  }
}