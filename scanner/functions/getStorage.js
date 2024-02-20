function getStorage(key) {
  return __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __awaiter */](this, void 0, void 0, function () {
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __generator */](this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!!isWeb()) return [3, 2];
          return [4, promisify(dd.getStorage, {
            key: key
          })];

        case 1:
          return [2, _a.sent().data || []];

        case 2:
          return [2, localStorage.getItem(key) || []];
      }
    });
  });
}