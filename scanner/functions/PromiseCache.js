function PromiseCache () {
  var cache = this.cache = {};

  this.get = function (key, promiseGenerator) {
    if (key in cache) {
      return cache[key];
    }
    cache[key] = promiseGenerator();
    return cache[key];
  };
}