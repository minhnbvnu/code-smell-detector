function promiseMap (arr, fn, opts, _index) {
  _index = _index || 0
  const P = (opts && opts.Promise) || Promise
  if (P.map) {
    return P.map(arr, fn, opts)
  } else {
    if (!(arr instanceof Array)) {
      arr = Array.from(arr)
    }
    if (_index >= arr.length) {
      return P.resolve()
    } else {
      return P.resolve(fn(arr[_index], _index, arr))
      .then(() => promiseMap(arr, fn, opts, _index + 1))
    }
  }
}