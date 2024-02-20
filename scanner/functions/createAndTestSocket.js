function createAndTestSocket (dir) {
    mkdirp(dir, options.mod, function (err) {
      if (err) {
        return callback(err);
      }

      options.exists = true;
      testSocket();
    });
  }