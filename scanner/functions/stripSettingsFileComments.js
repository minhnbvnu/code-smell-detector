function stripSettingsFileComments(str) {
  var rxp = /\/\/.*/g;
  return str.replace(rxp, '');
}