function setStorage(key, data) {
  return __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __awaiter */](this, void 0, void 0, function () {
    return __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __generator */](this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!!isWeb()) return [3, 2];
          return [4, promisify(dd.setStorage, {
            key: key,
            data: data
          })];

        case 1:
          _a.sent();

          return [3, 3];

        case 2:
          localStorage.setItem(key, data);
          _a.label = 3;

        case 3:
          return [2];
      }
    });
  });
}