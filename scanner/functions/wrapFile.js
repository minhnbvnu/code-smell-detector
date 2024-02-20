function wrapFile(globFile, callback) {
    var file = new File(globFile);

    callback(null, file);
  }