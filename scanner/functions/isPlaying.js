function isPlaying() {
  return audio.duration && !audio.paused && !audio.ended && 0 < audio.currentTime;
}