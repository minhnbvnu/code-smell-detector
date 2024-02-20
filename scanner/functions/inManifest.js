function inManifest(path) {
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}