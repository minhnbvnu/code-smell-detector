function Rate(props) {
	    _classCallCheck(this, Rate);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _initialiseProps.call(_this);

	    var value = props.value;
	    if (value === undefined) {
	      value = props.defaultValue;
	    }
	    _this.state = {
	      value: value
	    };
	    return _this;
	  }