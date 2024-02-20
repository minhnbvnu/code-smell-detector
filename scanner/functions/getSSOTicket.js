function getSSOTicket(opt) {
  return __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __awaiter */](this, void 0, void 0, function () {
    var DEFAULTS, appName, corpId, _a, ssoURL, code, response;

    return __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __generator */](this, function (_b) {
      switch (_b.label) {
        case 0:
          DEFAULTS = Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])(opt);
          appName = DEFAULTS.appName, corpId = DEFAULTS.corpId, _a = DEFAULTS.ssoURL, ssoURL = _a === void 0 ? '' : _a;

          if (!appName || !corpId) {
            throw new Error('appName and corpId is required');
          }

          if (!Object(__WEBPACK_IMPORTED_MODULE_3__index__["d" /* isDingTalk */])()) {
            throw new Error('Only support the Dingtalk environment');
          }

          return [4, getCode(DEFAULTS)];

        case 1:
          code = _b.sent();
          return [4, Object(__WEBPACK_IMPORTED_MODULE_1__request_index__["b" /* makeDDHttpRequest */])({
            url: ssoURL,
            data: {
              code: code,
              corpid: corpId,
              client_id: appName,
              grant_type: 'SSO_TICKET'
            }
          })];

        case 2:
          response = _b.sent();
          return [2, response.data];
      }
    });
  });
}