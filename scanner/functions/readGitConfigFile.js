function readGitConfigFile(path) {
  var file = new File(path);
  var o = null;
  var parts;
  if (file.exists) {
    o = {};
    file.open('r');
    while(!file.eof) {
      parts = file.readln().split('=');
      if (parts.length > 1) {
        o[trim(parts[0])] = trim(parts[1]);
      }
    }
    file.close();
  }
  return o;
}