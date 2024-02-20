function wrapVinyl() {
  function wrapFile(globFile, callback) {
    var file = new File(globFile);

    callback(null, file);
  }

  return new Transform({
    transform: wrapFile,
  });
}