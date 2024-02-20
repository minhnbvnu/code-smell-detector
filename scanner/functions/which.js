function which(name) {
  var paths = process.env.PATH.split(':');
  var loc;
  
  for (var i = 0, len = paths.length; i < len; ++i) {
    loc = path.join(paths[i], name);
    if (exists(loc)) return loc;
  }
}