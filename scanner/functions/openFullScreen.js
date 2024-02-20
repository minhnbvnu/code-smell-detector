function openFullScreen() {
    const el = (element && element.current) || document.documentElement;

    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.msRequestFullscreen) return el.msRequestFullscreen();
  }