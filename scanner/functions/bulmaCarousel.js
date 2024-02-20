function bulmaCarousel(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, bulmaCarousel);

    var _this = _possibleConstructorReturn(this, (bulmaCarousel.__proto__ || Object.getPrototypeOf(bulmaCarousel)).call(this));

    _this.element = Object(__WEBPACK_IMPORTED_MODULE_2__utils_type__["c" /* isString */])(selector) ? document.querySelector(selector) : selector;
    // An invalid selector or non-DOM node has been provided.
    if (!_this.element) {
      throw new Error('An invalid selector or non-DOM node has been provided.');
    }
    _this._clickEvents = ['click', 'touch'];

    // Use Element dataset values to override options
    var elementConfig = _this.element.dataset ? Object.keys(_this.element.dataset).filter(function (key) {
      return Object.keys(__WEBPACK_IMPORTED_MODULE_12__defaultOptions__["a" /* default */]).includes(key);
    }).reduce(function (obj, key) {
      return _extends({}, obj, _defineProperty({}, key, _this.element.dataset[key]));
    }, {}) : {};
    // Set default options - dataset attributes are master
    _this.options = _extends({}, __WEBPACK_IMPORTED_MODULE_12__defaultOptions__["a" /* default */], options, elementConfig);

    _this._id = Object(__WEBPACK_IMPORTED_MODULE_0__utils_index__["a" /* uuid */])('slider');

    _this.onShow = _this.onShow.bind(_this);

    // Initiate plugin
    _this._init();
    return _this;
  }