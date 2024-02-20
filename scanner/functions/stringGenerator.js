function stringGenerator(option) {
  if (option === void 0) {
    option = {
      is: 'basic'
    };
  }

  if (typeof option === 'string') {
    return option;
  }

  switch (option.is) {
    case 'email':
      return Object(__WEBPACK_IMPORTED_MODULE_2__email__["a" /* emailGenerator */])();

    case 'tel':
    case 'telephone':
      return Object(__WEBPACK_IMPORTED_MODULE_3__tele__["a" /* telGenerator */])();

    case 'mobile':
      return Object(__WEBPACK_IMPORTED_MODULE_3__tele__["a" /* telGenerator */])();

    default:
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* optionWarn */])('string', option);

    case 'basic':
      return Object(__WEBPACK_IMPORTED_MODULE_1__basic__["a" /* basicGenerator */])(option);
  }
}