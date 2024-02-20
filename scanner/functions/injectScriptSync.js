function injectScriptSync(src) {
  let code = '';
  const request = new XMLHttpRequest();
  request.addEventListener('load', function () {
    code = this.responseText;
  });
  request.open('GET', src, false);
  request.send();
  const script = document.createElement('script');
  script.textContent = code; // This script runs before the <head> element is created,
  // so we add the script to <html> instead.

  nullthrows__WEBPACK_IMPORTED_MODULE_0___default()(document.documentElement).appendChild(script);
  nullthrows__WEBPACK_IMPORTED_MODULE_0___default()(script.parentNode).removeChild(script);
}