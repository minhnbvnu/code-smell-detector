function isAlreadyRunning(err) {
    return err && err.statusCode === 304;
  }