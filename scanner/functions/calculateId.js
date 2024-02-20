function calculateId() {
  if (global.chromeAppId) {
    return Promise.resolve(global.chromeAppId);
  }
  if (!global.chromeManifest.key) {
    return Promise.reject('no key in manifest, please provide an --app-id')
  }
  return require('./chrome-app-id.js').calculateId(global.chromeManifest.key);
}