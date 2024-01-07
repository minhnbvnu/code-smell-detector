function writeCachedJavaScript(relativeCachePath, code) {
  const cachePath = path.join(cacheDirectory, relativeCachePath);
  fs.writeFileSync(cachePath, code, 'utf8');
}