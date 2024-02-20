function promisify(func, opts) {
  return new Promise(function (resolve, reject) {
    if (type(func) !== 'function') {
      return resolve(func);
    }

    func(__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, opts, {
      success: function (json) {
        resolve(json);
      },
      fail: function (err) {
        reject(err);
      }
    }));
    return null;
  });
}