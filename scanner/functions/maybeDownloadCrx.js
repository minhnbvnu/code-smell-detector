function maybeDownloadCrx() {
  if (manifest != null)
    return Promise.resolve();

  // download the crx, let the main entry point extract and spew any possible errors?
  return chromeAppUpdater.downloadLatestVersion(appId)
  .then(function() {
    // reloading!
    // https://www.youtube.com/watch?v=VEjIJz077k0
    app.relaunch();
    app.exit(0);
  })
}