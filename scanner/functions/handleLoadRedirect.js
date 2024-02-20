function handleLoadRedirect(event) {
  resetExitedState();
  document.querySelector('#location').value = event.newUrl;
}