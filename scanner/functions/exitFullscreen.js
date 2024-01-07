function exitFullScreen(doc) {
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc['webkitExitFullscreen']) {
    doc['webkitExitFullscreen']();
  }
}