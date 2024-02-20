function setUpPromise() {
  // The native Promise implementation throws the following error:
  // ERROR: Event loop not supported.
  polyfillLazyGlobal('Promise', () => require('Promise'));
}