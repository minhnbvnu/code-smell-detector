function requestFullScreenWithKeys(element) {
  if (element['webkitRequestFullscreen']) {
    element['webkitRequestFullscreen']();
  } else {
    requestFullScreen(element);
  }
}