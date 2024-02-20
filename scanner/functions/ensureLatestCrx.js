function ensureLatestCrx(appId, currentVersion) {
  return new Promise((resolve, reject) => {
    chromeAppUpdater.getLatestVersion(appId)
    .then(latest => {
      console.log('latest version of', appId, latest.version, 'vs current', currentVersion);
      if (latest.version <= currentVersion) {
        resolve();
        return;
      }

      chromeAppUpdater.downloadCrx(appId, latest)
      .then((crxPath) => {
        try {
          return chromeAppUpdater.extractCrx(crxPath);
        }
        catch (e) {
          fs.unlinkSync(crxPath);
          throw e;
        }
      })
      .then(function() {
        resolve(latest.version);
      })
    })
  })
}