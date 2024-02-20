function saveUnbundle(bundle, options, log) {
  // we fork here depending on the platform:
  // while android is pretty good at loading individual assets, ios has a large
  // overhead when reading hundreds pf assets from disk
  return options.platform === 'android' ?
    asAssets(bundle, options, log) :
    asIndexedFile(bundle, options, log);
}