function loadWindowSettings(id) {
  return JSON.parse(localStorage.getItem('window-settings-' + id)) || {};
}