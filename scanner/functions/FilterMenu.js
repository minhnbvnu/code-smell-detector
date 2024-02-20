function FilterMenu(props) {
	        (0, _classCallCheck3['default'])(this, FilterMenu);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (FilterMenu.__proto__ || Object.getPrototypeOf(FilterMenu)).call(this, props));

	        _this.setNeverShown = function (column) {
	            var rootNode = _reactDom2['default'].findDOMNode(_this);
	            var filterBelongToScrollBody = !!(0, _domClosest2['default'])(rootNode, '.ant-table-scroll');
	            if (filterBelongToScrollBody) {
	                // When fixed column have filters, there will be two dropdown menus
	                // Filter dropdown menu inside scroll body should never be shown
	                // To fix https://github.com/ant-design/ant-design/issues/5010 and
	                // https://github.com/ant-design/ant-design/issues/7909
	                _this.neverShown = !!column.fixed;
	            }
	        };
	        _this.setSelectedKeys = function (_ref) {
	            var selectedKeys = _ref.selectedKeys;

	            _this.setState({ selectedKeys: selectedKeys });
	        };
	        _this.handleClearFilters = function () {
	            _this.setState({
	                selectedKeys: []
	            }, _this.handleConfirm);
	        };
	        _this.handleConfirm = function () {
	            _this.setVisible(false);
	            _this.confirmFilter();
	        };
	        _this.onVisibleChange = function (visible) {
	            _this.setVisible(visible);
	            if (!visible) {
	                _this.confirmFilter();
	            }
	        };
	        _this.handleMenuItemClick = function (info) {
	            if (info.keyPath.length <= 1) {
	                return;
	            }
	            var keyPathOfSelectedItem = _this.state.keyPathOfSelectedItem;
	            if (_this.state.selectedKeys.indexOf(info.key) >= 0) {
	                // deselect SubMenu child
	                delete keyPathOfSelectedItem[info.key];
	            } else {
	                // select SubMenu child
	                keyPathOfSelectedItem[info.key] = info.keyPath;
	            }
	            _this.setState({ keyPathOfSelectedItem: keyPathOfSelectedItem });
	        };
	        _this.renderFilterIcon = function () {
	            var _this$props = _this.props,
	                column = _this$props.column,
	                locale = _this$props.locale,
	                prefixCls = _this$props.prefixCls;

	            var filterIcon = column.filterIcon;
	            var dropdownSelectedClass = _this.props.selectedKeys.length > 0 ? prefixCls + '-selected' : '';
	            return filterIcon ? _react2['default'].cloneElement(filterIcon, {
	                title: locale.filterTitle,
	                className: (0, _classnames2['default'])(filterIcon.className, (0, _defineProperty3['default'])({}, prefixCls + '-icon', true))
	            }) : _react2['default'].createElement(_icon2['default'], { title: locale.filterTitle, type: 'filter', className: dropdownSelectedClass });
	        };
	        var visible = 'filterDropdownVisible' in props.column ? props.column.filterDropdownVisible : false;
	        _this.state = {
	            selectedKeys: props.selectedKeys,
	            keyPathOfSelectedItem: {},
	            visible: visible
	        };
	        return _this;
	    }