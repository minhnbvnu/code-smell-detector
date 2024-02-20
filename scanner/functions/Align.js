function Align() {
    var _ref;
    var _temp, _this, _ret;
    classCallCheck_default()(this, Align);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = possibleConstructorReturn_default()(this, (_ref = Align.__proto__ || Object.getPrototypeOf(Align)).call.apply(_ref, [this].concat(args))), _this), _this.forceAlign = function () {
      var _this$props = _this.props,
        disabled = _this$props.disabled,
        target = _this$props.target,
        align = _this$props.align,
        onAlign = _this$props.onAlign;
      if (!disabled && target) {
        var source = external_window_ReactDOM_default.a.findDOMNode(_this);
        var result = void 0;
        var element = getElement(target);
        var point = getPoint(target);

        // IE lose focus after element realign
        // We should record activeElement and restore later
        var activeElement = document.activeElement;
        if (element) {
          result = alignElement(source, element, align);
        } else if (point) {
          result = dist_web_alignPoint(source, point, align);
        }
        restoreFocus(activeElement, source);
        if (onAlign) {
          onAlign(source, result);
        }
      }
    }, _temp), possibleConstructorReturn_default()(_this, _ret);
  }