function StyleButton() {
    _classCallCheck(this, StyleButton);

    var _this = _possibleConstructorReturn(this, (StyleButton.__proto__ || Object.getPrototypeOf(StyleButton)).call(this));

    _this.onToggle = function (e) {
      e.preventDefault();
      _this.props.onToggle(_this.props.style);
    };
    return _this;
  }