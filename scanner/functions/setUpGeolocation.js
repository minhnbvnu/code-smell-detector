function setUpGeolocation() {
  polyfillIfNeeded('navigator', {}, GLOBAL, {
    writable: true,
    enumerable: true,
    configurable: true,
  });
  polyfillLazyGlobal('geolocation', () => require('Geolocation'), GLOBAL.navigator);
}