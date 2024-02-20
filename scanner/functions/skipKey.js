function skipKey(key) {
  if (this.skipKeys == null) {
    this.skipKeys = {};
  }

  this.skipKeys[key] = true;
}