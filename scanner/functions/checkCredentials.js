function checkCredentials(maybeUser, maybePassword, cb) {
    cb(maybeUser === user && maybePassword === pass);
  }