function Dropdown(props) {
	    _classCallCheck(this, Dropdown);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	    _initialiseProps.call(_this);

	    if ('visible' in props) {
	      _this.state = {
	        visible: props.visible
	      };
	    } else {
	      _this.state = {
	        visible: props.defaultVisible
	      };
	    }
	    return _this;
	  }