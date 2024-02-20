function readSettingsFile(path) {
  var o = {}, str;
  try {
    str = stripSettingsFileComments(readTextFile(path));
    o = JSON.parse(str);
  } catch(e) {
    warn('Error reading settings file ' + path + ': [' + e.message + ']');
  }
  return o;
}