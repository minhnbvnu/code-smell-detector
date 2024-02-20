function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(60);
  } else if (true) {
    // For node use HTTP adapter
    adapter = __webpack_require__(60);
  }

  return adapter;
}