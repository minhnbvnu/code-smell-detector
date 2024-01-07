function getReleasesFile(fileName) {
  return function(req, res) {
    console.log(
      `Received request for ${fileName}, version: ${req.query.version}`
    );
    if (req.query.version) {
      const versionMatch = (req.query.version || '').match(
        /-(beta|nightly)\d+$/
      );
      const versionChannel = (versionMatch && versionMatch[1]) || 'stable';
      if (releaseChannel !== versionChannel) {
        console.log(
          `Atom requested an update for version ${
            req.query.version
          } but the current release channel is ${releaseChannel}`
        );
        res.sendStatus(404);
        return;
      }
    }

    res.sendFile(path.join(buildPath, fileName));
  };
}