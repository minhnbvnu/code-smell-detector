function navigateTo(url) {
  resetExitedState();
  document.querySelector('webview').src = url;
}