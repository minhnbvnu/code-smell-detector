function hset(key, field, value) {
    client.hset(prefix + key, field, value);
  }