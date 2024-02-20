function Star() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, Star);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onHover = function (e) {
	      var _this$props = _this.props,
	          onHover = _this$props.onHover,
	          index = _this$props.index;

	      onHover(e, index);
	    }, _this.onClick = function (e) {
	      var _this$props2 = _this.props,
	          onClick = _this$props2.onClick,
	          index = _this$props2.index;

	      onClick(e, index);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }