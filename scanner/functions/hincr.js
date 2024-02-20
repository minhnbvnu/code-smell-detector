function hincr(key, field) {
    client.hincrby(prefix + key, field, 1);
  }