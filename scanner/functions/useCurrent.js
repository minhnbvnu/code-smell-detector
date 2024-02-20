function useCurrent() {
  global.chromeRuntimeVersion = myManifestVersion;
  console.log('using chrome runtime', myManifestVersion);
  // grab this, or grab latest one
  exports.start = function() {
    require('./main/start.js');
  }
}