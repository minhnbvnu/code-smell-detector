function requestFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element['webkitRequestFullscreen']) {
    element['webkitRequestFullscreen']();
  }
}