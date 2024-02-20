function createDeepProxy(target, affected, cache) {
  if (!shouldTrack(target)) return target;

  let proxyHandler = cache.get(target);
  if (!proxyHandler) {
    proxyHandler = createProxyHandler(target);
    proxyHandler[PROXY] = new Proxy(target, proxyHandler);
    cache.set(target, proxyHandler);
  }

  proxyHandler[AFFECTED] = affected;
  proxyHandler[CACHE] = cache;

  return proxyHandler[PROXY];
}