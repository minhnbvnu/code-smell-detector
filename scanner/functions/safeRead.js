function safeRead(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      if (error.errno === process.ENOENT) {
        // Ignore file not found errors and return an empty result
        callback(null, "");
      } else {
        // Pass other errors through as is
        callback(err);
      }
    } else {
      // Pass successes through as it too.
      callback(null, data);
    }
  })
}