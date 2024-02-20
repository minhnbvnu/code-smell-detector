function hgetall(key, cb) {
    client.hgetall(prefix + key, cb);
  }