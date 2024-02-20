function FragmentNode(childNodes) {
	    _classCallCheck(this, FragmentNode);

	    var _this3 = _possibleConstructorReturn(this, (FragmentNode.__proto__ || Object.getPrototypeOf(FragmentNode)).apply(this, arguments));

	    _this3.nodeType = NODE_TYPE_FRAGMENT;
	    _this3.childNodes = [];
	    if (childNodes) {
	      childNodes.forEach(_this3.appendChild, _this3);
	    }
	    return _this3;
	  }