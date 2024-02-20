function Tree(props) {
	    (0, _classCallCheck3['default'])(this, Tree);

	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

	    _initialiseProps.call(_this);

	    var checkedKeys = _this.calcCheckedKeys(props);
	    _this.state = {
	      expandedKeys: _this.calcExpandedKeys(props),
	      checkedKeys: checkedKeys.checkedKeys,
	      halfCheckedKeys: checkedKeys.halfCheckedKeys,
	      selectedKeys: _this.calcSelectedKeys(props),
	      dragNodesKeys: '',
	      dragOverNodeKey: '',
	      dropNodeKey: ''
	    };
	    return _this;
	  }