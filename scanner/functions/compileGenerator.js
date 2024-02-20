function compileGenerator(pattern) {
  var cacheKey = pattern;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
  if (cache.generator) return cache.generator;
  var compiledGenerator = __WEBPACK_IMPORTED_MODULE_2_path_to_regexp___default.a.compile(pattern);

  if (cacheCount < cacheLimit) {
    cache.generator = compiledGenerator;
    cacheCount++;
  }

  return compiledGenerator;
}