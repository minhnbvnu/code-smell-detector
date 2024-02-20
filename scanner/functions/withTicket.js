function withTicket(url, ticket) {
  if (!ticket) return url;
  var spliter = url.split('?');
  var str = spliter[1] || '';
  var query = __WEBPACK_IMPORTED_MODULE_1_qs__["stringify"](__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __assign */]({}, __WEBPACK_IMPORTED_MODULE_1_qs__["parse"](str), {
    SSO_TICKET: ticket
  }));
  return spliter[0] + "?" + query;
}