function numberGenerator(option) {
  if (option === void 0) {
    option = {
      is: 'basic'
    };
  }

  if (typeof option === 'number') {
    return option;
  }

  switch (option.is) {
    case 'date':
      return Object(__WEBPACK_IMPORTED_MODULE_2__date__["a" /* dateGenerator */])();

    case 'float':
      return Object(__WEBPACK_IMPORTED_MODULE_3__float__["a" /* floatGenerator */])(option);

    default:
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* optionWarn */])('string', option);

    case 'basic':
      return Object(__WEBPACK_IMPORTED_MODULE_1__basic__["a" /* basicGenerator */])(option);
  }
}