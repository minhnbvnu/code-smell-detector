function addFullScreenToggle() {
  const elements = document.getElementsByClassName('fullscreen-button')
  for (let element of elements) {
    element.setAttribute('onclick', 'toggleFullScreen(this)')
  }
}