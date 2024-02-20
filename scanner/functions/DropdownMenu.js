function DropdownMenu() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3['default'])(this, DropdownMenu);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.scrollActiveItemToView = function () {
	      // scroll into view
	      var itemComponent = (0, _reactDom.findDOMNode)(_this.firstActiveItem);
	      var props = _this.props;

	      if (itemComponent) {
	        var scrollIntoViewOpts = {
	          onlyScrollIfNeeded: true
	        };
	        if ((!props.value || props.value.length === 0) && props.firstActiveValue) {
	          scrollIntoViewOpts.alignWithTop = true;
	        }

	        (0, _domScrollIntoView2['default'])(itemComponent, (0, _reactDom.findDOMNode)(_this.refs.menu), scrollIntoViewOpts);
	      }
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }