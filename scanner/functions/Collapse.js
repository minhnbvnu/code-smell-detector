function Collapse(props) {
	    _classCallCheck(this, Collapse);

	    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

	    var _this$props = _this.props,
	        activeKey = _this$props.activeKey,
	        defaultActiveKey = _this$props.defaultActiveKey;

	    var currentActiveKey = defaultActiveKey;
	    if ('activeKey' in _this.props) {
	      currentActiveKey = activeKey;
	    }

	    _this.state = {
	      openAnimation: _this.props.openAnimation || (0, _openAnimationFactory2['default'])(_this.props.prefixCls),
	      activeKey: toArray(currentActiveKey)
	    };
	    return _this;
	  }