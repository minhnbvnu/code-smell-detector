function argsToObject(args) {
  var o = { other: [] };
  for (var i = 0; i < args.length;) {
    var n = args[i];
    if (i + 1 < args.length) {
      var v = args[i + 1];
      if (n === "-a" || n === "--arch") {
        o.arch = v;
        i += 2;
        continue;
      }
      if (n === "-v" || n === "--version") {
        o.version = v;
        i += 2;
        continue;
      }
      if (n === "-l" || n === "--loglevel") {
        o.loglevel = v;
        i += 2;
        continue;
      }
    }
    o.other.push(n);
    i += 1;
  }
  return o;
}