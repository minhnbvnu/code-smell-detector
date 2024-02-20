function fetchMainSourceMap() {
  if (!sourceMapsCache[SourceMapsCache.mainSourceMapID]) {
    sourceMapsCache[SourceMapsCache.mainSourceMapID] =
      SourceMapsUtils.fetchMainSourceMap();
  }
}