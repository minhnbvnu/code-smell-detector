function DecadePanel(props) {
	    (0, _classCallCheck3['default'])(this, DecadePanel);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, (DecadePanel.__proto__ || Object.getPrototypeOf(DecadePanel)).call(this, props));

	    _this.state = {
	      value: props.value || props.defaultValue
	    };

	    // bind methods
	    _this.prefixCls = props.rootPrefixCls + '-decade-panel';
	    _this.nextCentury = goYear.bind(_this, 100);
	    _this.previousCentury = goYear.bind(_this, -100);
	    return _this;
	  }