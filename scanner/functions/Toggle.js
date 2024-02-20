function Toggle(props) {
	    _classCallCheck(this, Toggle);
	
	    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
	    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
	    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
	    _this.handleFocus = _this.handleFocus.bind(_this);
	    _this.handleBlur = _this.handleBlur.bind(_this);
	    _this.previouslyChecked = !!(props.checked || props.defaultChecked);
	    _this.state = {
	      checked: !!(props.checked || props.defaultChecked),
	      hasFocus: false
	    };
	    return _this;
	  }