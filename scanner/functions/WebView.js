function WebView() {
    _classCallCheck(this, WebView);

    this.currentLayoutClass = void 0;
    this.testing = false;
    this.preparingTimeout = null;

    // Special code for testing situations
    var _qs$parse = qs__WEBPACK_IMPORTED_MODULE_21___default.a.parse(document.location.search, {
      ignoreQueryPrefix: true
    }),
        __SPECIAL_TEST_PARAMETER__ = _qs$parse.__SPECIAL_TEST_PARAMETER__;

    switch (__SPECIAL_TEST_PARAMETER__) {
      case 'preparing-story':
        {
          this.showPreparingStory();
          this.testing = true;
          break;
        }

      case 'preparing-docs':
        {
          this.showPreparingDocs();
          this.testing = true;
          break;
        }

      default: // pass;

    }
  }