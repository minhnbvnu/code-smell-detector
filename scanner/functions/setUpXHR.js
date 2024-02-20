function setUpXHR() {
  // The native XMLHttpRequest in Chrome dev tools is CORS aware and won't
  // let you fetch anything from the internet
  polyfillLazyGlobal('XMLHttpRequest', () => require('XMLHttpRequest'));
  polyfillLazyGlobal('FormData', () => require('FormData'));

  polyfillLazyGlobal('fetch', () => require('fetch').fetch);
  polyfillLazyGlobal('Headers', () => require('fetch').Headers);
  polyfillLazyGlobal('Request', () => require('fetch').Request);
  polyfillLazyGlobal('Response', () => require('fetch').Response);
}