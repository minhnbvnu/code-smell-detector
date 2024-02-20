function QueryStringKeyEnvironment(key) {
  this.key = key;
  Environment.HashEnvironment.call(this);
}