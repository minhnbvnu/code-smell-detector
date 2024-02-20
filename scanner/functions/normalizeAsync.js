function normalizeAsync (cache, method) {
  var fn = cache[method];
  if (isUndef(fn)) {
    return
  } else if (fn.length > 1) {
    return function (key, cb) { return fn.call(cache, key, cb); }
  } else {
    return function (key, cb) { return cb(fn.call(cache, key)); }
  }
}