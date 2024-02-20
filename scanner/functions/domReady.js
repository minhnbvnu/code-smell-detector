function domReady() {
    isDomReady = true;
    for (var x = 0; x < readyCallbacks.length; x++) {
      ionic.requestAnimationFrame(readyCallbacks[x]);
    }
    readyCallbacks = [];
    document.removeEventListener('DOMContentLoaded', domReady);
  }