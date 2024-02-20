function closeFullScreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
  }