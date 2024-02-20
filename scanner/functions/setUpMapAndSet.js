function setUpMapAndSet() {
  // We can't make these lazy as Map checks the global.Map to see if it's
  // available but in our case it'll be a lazy getter.
  polyfillGlobal('Map', require('Map'));
  polyfillGlobal('Set', require('Set'));
}