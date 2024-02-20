function checkAndTestSocket () {
    var dir = path.dirname(options.path);

    fs.stat(dir, function (err, stats) {
      if (err || !stats.isDirectory()) {
        return createAndTestSocket(dir);
      }

      options.exists = true;
      testSocket();
    });
  }