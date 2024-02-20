function YearPanel(props) {
	    (0, _classCallCheck3['default'])(this, YearPanel);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, (YearPanel.__proto__ || Object.getPrototypeOf(YearPanel)).call(this, props));

	    _this.prefixCls = props.rootPrefixCls + '-year-panel';
	    _this.state = {
	      value: props.value || props.defaultValue
	    };
	    _this.nextDecade = goYear.bind(_this, 10);
	    _this.previousDecade = goYear.bind(_this, -10);
	    ['showDecadePanel', 'onDecadePanelSelect'].forEach(function (method) {
	      _this[method] = _this[method].bind(_this);
	    });
	    return _this;
	  }