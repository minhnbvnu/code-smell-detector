function fullscreenAllowed() {
  return (document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullScreenEnabled);
}