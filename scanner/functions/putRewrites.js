function putRewrites(rewrites) {
    return db.put({
      _id: '_design/test',
      rewrites: rewrites
    });
  }