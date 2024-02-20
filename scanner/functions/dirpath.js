function dirpath(file, callback) {
    var dirMode = optResolver.resolve('dirMode', file);

    callback(null, file.dirname, dirMode);
  }