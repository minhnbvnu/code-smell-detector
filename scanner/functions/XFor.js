function XFor(data, delegate) {
  if (Array.isArray(data)) {
    return data.map(function (item, index) {
      return delegate(String(index), item);
    });
  }

  if (data) {
    if (data instanceof Set || data instanceof Map) {
      var frags = [];

      var fn = function fn(item, key) {
        frags.push(delegate(key, item));
      };

      data instanceof Map ? iterMap(data, fn) : iterSet(data, fn);
      return frags;
    }

    return Object.keys(data).map(function (key) {
      return delegate(key, data[key]);
    });
  }

  return null;
}