function withData(data) {
  return function(bundle) {
    bundle.loaded = Promise.resolve(data);
    return bundle;
  }
}