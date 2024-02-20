function Steps(props) {
	    _classCallCheck(this, Steps);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.calcStepOffsetWidth = function () {
	      var domNode = _reactDom2["default"].findDOMNode(_this);
	      if (domNode.children.length > 0) {
	        if (_this.calcTimeout) {
	          clearTimeout(_this.calcTimeout);
	        }
	        _this.calcTimeout = setTimeout(function () {
	          // +1 for fit edge bug of digit width, like 35.4px
	          var lastStepOffsetWidth = (domNode.lastChild.offsetWidth || 0) + 1;
	          // Reduce shake bug
	          if (_this.state.lastStepOffsetWidth === lastStepOffsetWidth || Math.abs(_this.state.lastStepOffsetWidth - lastStepOffsetWidth) <= 3) {
	            return;
	          }
	          _this.setState({ lastStepOffsetWidth: lastStepOffsetWidth });
	        });
	      }
	    };

	    _this.state = {
	      lastStepOffsetWidth: 0
	    };
	    _this.calcStepOffsetWidth = (0, _lodash2["default"])(_this.calcStepOffsetWidth, 150);
	    return _this;
	  }