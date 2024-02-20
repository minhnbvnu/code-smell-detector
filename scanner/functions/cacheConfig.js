function cacheConfig(config) {
  ++counter;
  configCache[counter] = config;
  return counter;
}