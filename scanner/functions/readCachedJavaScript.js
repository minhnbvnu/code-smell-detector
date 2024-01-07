function readCachedJavaScript(relativeCachePath) {
  const cachePath = path.join(cacheDirectory, relativeCachePath);
  if (fs.isFileSync(cachePath)) {
    try {
      return fs.readFileSync(cachePath, 'utf8');
    } catch (error) {}
  }
  return null;
}