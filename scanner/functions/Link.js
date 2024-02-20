function Link() {
    var _getPrototypeOf2;

    var _this;

    __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_classCallCheck___default()(this, Link);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = __WEBPACK_IMPORTED_MODULE_4__babel_runtime_helpers_possibleConstructorReturn___default()(this, (_getPrototypeOf2 = __WEBPACK_IMPORTED_MODULE_5__babel_runtime_helpers_getPrototypeOf___default()(Link)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          var _this$props = _this.props,
              _replace = _this$props.replace,
              _to = _this$props.to;
          var history = __WEBPACK_IMPORTED_MODULE_9__navigator__["a" /* default */].history;

          if (history) {
            if (_replace) {
              history.replace(_to);
            } else {
              history.push(_to);
            }
          }
        }
    };

    return _this;
  }