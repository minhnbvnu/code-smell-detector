function getCachedMultiPassGeometry(cache, geometry, primitives) {

  for (var i = 0, il = cache.length; i < il; i++) {

    var cached = cache[i];

    if (geometry === cached.baseGeometry && isArrayEqual(primitives, cached.primitives)) return cached.geometry;

  }

  return null;

}