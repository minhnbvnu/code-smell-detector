function cacheCallbackResult(fun) {
  return function (handler, requestor, resolver) {
    if (cache.has(resolver)) {
      return cache.get(resolver);
    }

    const t = fun(handler, requestor, resolver);
    cache.set(resolver, t);
    return t;
  };
}