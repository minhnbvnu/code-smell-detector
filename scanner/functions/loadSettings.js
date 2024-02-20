function loadSettings() {
  for (var key in settings) {
    var value = localStorage.getItem(key);
    if (value !== null) {
      settings[key].value = JSON.parse(value);
    }
  }
}