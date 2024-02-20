function SelectTrigger() {
	    var _temp, _this, _ret;

	    (0, _classCallCheck3['default'])(this, SelectTrigger);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	      _expandedKeys: [],
	      fireOnExpand: false,
	      dropdownWidth: null
	    }, _this.onExpand = function (expandedKeys) {
	      // rerender
	      _this.setState({
	        _expandedKeys: expandedKeys,
	        fireOnExpand: true
	      }, function () {
	        // Fix https://github.com/ant-design/ant-design/issues/5689
	        if (_this.refs.trigger && _this.refs.trigger.forcePopupAlign) {
	          _this.refs.trigger.forcePopupAlign();
	        }
	      });
	    }, _this.highlightTreeNode = function (treeNode) {
	      var props = _this.props;
	      var filterVal = treeNode.props[(0, _util.labelCompatible)(props.treeNodeFilterProp)];
	      if (typeof filterVal === 'string') {
	        return props.inputValue && filterVal.indexOf(props.inputValue) > -1;
	      }
	      return false;
	    }, _this.filterTreeNode = function (input, child) {
	      if (!input) {
	        return true;
	      }
	      var filterTreeNode = _this.props.filterTreeNode;
	      if (!filterTreeNode) {
	        return true;
	      }
	      if (child.props.disabled) {
	        return false;
	      }
	      return filterTreeNode.call(_this, input, child);
	    }, _this.savePopupElement = function (ele) {
	      _this.popupEle = ele;
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }