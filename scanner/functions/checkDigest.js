function checkDigest(maybeUser, cb) {
    cb(maybeUser === user ? digest : null);
  }