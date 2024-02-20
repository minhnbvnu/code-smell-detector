function Tippy(selector) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tippy);

    // Use default browser tooltip on unsupported browsers
    if (!_globals.Browser.SUPPORTED) return;

    (0, _init2.default)();

    this.state = {
      destroyed: false
    };

    this.selector = selector;

    this.settings = _extends({}, _globals.Defaults, settings);

    if (settings.show || settings.shown || settings.hide || settings.hidden) {
      console.warn('Callbacks without the `on` prefix are deprecated (with the exception of `wait`).' + ' Use onShow, onShown, onHide, and onHidden instead.');
    }

    this.callbacks = {
      wait: settings.wait,
      show: settings.onShow || settings.show || _noop2.default,
      shown: settings.onShown || settings.shown || _noop2.default,
      hide: settings.onHide || settings.hide || _noop2.default,
      hidden: settings.onHidden || settings.hidden || _noop2.default
    };

    this.store = _createTooltips2.default.call(this, (0, _getArrayOfElements2.default)(selector));
    _globals.Store.push.apply(_globals.Store, this.store);
  }