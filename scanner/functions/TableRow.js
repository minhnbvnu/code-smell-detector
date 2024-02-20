function TableRow() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3['default'])(this, TableRow);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      hovered: false,
	      height: null
	    }, _this.onRowClick = function (event) {
	      var _this$props = _this.props,
	          record = _this$props.record,
	          index = _this$props.index,
	          onRowClick = _this$props.onRowClick,
	          expandable = _this$props.expandable,
	          expandRowByClick = _this$props.expandRowByClick,
	          expanded = _this$props.expanded,
	          onExpand = _this$props.onExpand;

	      if (expandable && expandRowByClick) {
	        onExpand(!expanded, record, event, index);
	      }
	      onRowClick(record, index, event);
	    }, _this.onRowDoubleClick = function (event) {
	      var _this$props2 = _this.props,
	          record = _this$props2.record,
	          index = _this$props2.index,
	          onRowDoubleClick = _this$props2.onRowDoubleClick;

	      onRowDoubleClick(record, index, event);
	    }, _this.onContextMenu = function (event) {
	      var _this$props3 = _this.props,
	          record = _this$props3.record,
	          index = _this$props3.index,
	          onRowContextMenu = _this$props3.onRowContextMenu;

	      onRowContextMenu(record, index, event);
	    }, _this.onMouseEnter = function (event) {
	      var _this$props4 = _this.props,
	          record = _this$props4.record,
	          index = _this$props4.index,
	          onRowMouseEnter = _this$props4.onRowMouseEnter,
	          onHover = _this$props4.onHover,
	          hoverKey = _this$props4.hoverKey;

	      onHover(true, hoverKey);
	      onRowMouseEnter(record, index, event);
	    }, _this.onMouseLeave = function (event) {
	      var _this$props5 = _this.props,
	          record = _this$props5.record,
	          index = _this$props5.index,
	          onRowMouseLeave = _this$props5.onRowMouseLeave,
	          onHover = _this$props5.onHover,
	          hoverKey = _this$props5.hoverKey;

	      onHover(false, hoverKey);
	      onRowMouseLeave(record, index, event);
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }