function getDeps(file) {
  var ret = [];

  if (Array.isArray(file)) {
    file.forEach(function(f) {
      ret = ret.concat(getDeps(f));
    });
    return require('uniq')(ret);
  }

  return require('./utils/deps').getDeps(file);
}