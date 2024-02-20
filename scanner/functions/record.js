function record(name, options) {
  var data = info();
  var ret = data[name] || {};

  if (options) {
    Object.keys(options).forEach(function(key) {
      ret[key] = options[key];
    });
  }

  ret.name = name;
  if (ret.count) {
    ret.count += 1;
  } else {
    ret.count = 1;
  }
  ret.time = new Date();
  data[name] = ret;
  mkdirs(dirname(runfile));
  writeJSON(runfile, data);
}