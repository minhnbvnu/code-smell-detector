function weakMapMemoize(func) {
  const cache = new WeakMap();
  return value => {
    if (!cache.has(value)) {
      cache.set(value, func(value));
    }

    return cache.get(value);
  };
}