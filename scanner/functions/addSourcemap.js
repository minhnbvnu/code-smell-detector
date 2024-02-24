function addSourcemap(file, callback) {
    var srcMap = optResolver.resolve('sourcemaps', file);

    if (!srcMap) {
      return callback(null, file);
    }

    sourcemap.add(file, onAdd);

    function onAdd(sourcemapErr, updatedFile) {
      if (sourcemapErr) {
        return callback(sourcemapErr);
      }

      callback(null, updatedFile);
    }
  }