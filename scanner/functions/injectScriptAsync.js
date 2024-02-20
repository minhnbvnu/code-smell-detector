function injectScriptAsync(src) {
  const script = document.createElement('script');
  script.src = src;

  script.onload = function () {
    script.remove();
  };

  nullthrows__WEBPACK_IMPORTED_MODULE_0___default()(document.documentElement).appendChild(script);
}