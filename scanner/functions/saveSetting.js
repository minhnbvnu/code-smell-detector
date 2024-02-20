function saveSetting(name) {
  var value = settings[name].value;
  if (Array.isArray(value)) {
    value = value.filter(item => item !== null);
  }
  value = JSON.stringify(value);
  localStorage.setItem(name, value);
}