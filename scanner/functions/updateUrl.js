function updateUrl () {
  window.history.replaceState(null, '', '#' + url.export(state.colors));
}