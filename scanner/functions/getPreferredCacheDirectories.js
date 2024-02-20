function getPreferredCacheDirectories() {
  const preferredCacheDirectories = [getCacheDir()];

  if (process.getuid) {
    // $FlowFixMe: process.getuid exists, dammit
    preferredCacheDirectories.push(path.join(os.tmpdir(), `.yarn-cache-${process.getuid()}`));
  }

  preferredCacheDirectories.push(path.join(os.tmpdir(), `.yarn-cache`));

  return preferredCacheDirectories;
}