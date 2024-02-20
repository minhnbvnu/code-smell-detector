function arrayGenerator(option) {
  if (option === void 0) {
    option = {
      is: 'basic'
    };
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* isArray */])(option)) {
    return option;
  }

  switch (option.is) {
    default:
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* optionWarn */])('string', option);

    case 'basic':
      return Object(__WEBPACK_IMPORTED_MODULE_2__basic__["a" /* basicGenerator */])(option);
  }
}