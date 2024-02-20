function getCachedCombinedGeometry(cache, geometries) {

  for (var i = 0, il = cache.length; i < il; i++) {

    var cached = cache[i];

    if (isArrayEqual(geometries, cached.baseGeometries)) return cached.geometry;

  }

  return null;

}