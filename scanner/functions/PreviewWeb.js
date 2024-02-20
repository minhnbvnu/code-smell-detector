function PreviewWeb() {
    var _this;

    var urlStore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _UrlStore__WEBPACK_IMPORTED_MODULE_26__[/* UrlStore */ "a"]();
    var webview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _WebView__WEBPACK_IMPORTED_MODULE_27__[/* WebView */ "a"]();

    _classCallCheck(this, PreviewWeb);

    _this = _super.call(this);
    _this.urlStore = void 0;
    _this.view = void 0;
    _this.previewEntryError = void 0;
    _this.currentSelection = void 0;
    _this.currentRender = void 0;
    _this.view = webview;
    _this.urlStore = urlStore; // Add deprecated APIs for back-compat
    // @ts-ignore

    _this.storyStore.getSelection = util_deprecate__WEBPACK_IMPORTED_MODULE_20___default()(function () {
      return _this.urlStore.selection;
    }, Object(ts_dedent__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        `__STORYBOOK_STORY_STORE__.getSelection()` is deprecated and will be removed in 7.0.\n  \n        To get the current selection, use the `useStoryContext()` hook from `@storybook/addons`.\n      "], ["\n        \\`__STORYBOOK_STORY_STORE__.getSelection()\\` is deprecated and will be removed in 7.0.\n  \n        To get the current selection, use the \\`useStoryContext()\\` hook from \\`@storybook/addons\\`.\n      "]))));
    return _this;
  }