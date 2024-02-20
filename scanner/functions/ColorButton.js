function ColorButton(props) {
    _classCallCheck(this, ColorButton);

    var _this = _possibleConstructorReturn(this, (ColorButton.__proto__ || Object.getPrototypeOf(ColorButton)).call(this, props));

    _this.onToggle = function (e) {
      e.preventDefault();
      _this.props.onToggle(_this.props.style);
    };
    return _this;
  }