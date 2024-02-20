function getCachedGeometry(cache, newPrimitive) {

  for (var i = 0, il = cache.length; i < il; i++) {

    var cached = cache[i];

    if (isPrimitiveEqual(cached.primitive, newPrimitive)) return cached.promise;

  }

  return null;

}