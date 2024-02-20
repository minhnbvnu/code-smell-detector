function createDataDirs() {
  function cb(err) {
    if (err) console.log(err);
  }

  var ddir = sparseConfig.modules.cdn.config.data_dir;

  fs.mkdir(path.join(ddir, "tmp"), 0755, true, cb);

  // create paths for permanent data
  fs.mkdir(path.join(ddir, "perm/cdn/img/av"), 0755, true, cb);
  fs.mkdir(path.join(ddir, "perm/cdn/img/icofactory"), 0755, true, cb);
  fs.mkdir(path.join(ddir, "perm/cdn/img/pods"), 0755, true, cb);

  aesSetup();
}