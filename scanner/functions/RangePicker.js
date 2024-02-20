function RangePicker(props) {
	        (0, _classCallCheck3['default'])(this, RangePicker);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (RangePicker.__proto__ || Object.getPrototypeOf(RangePicker)).call(this, props));

	        _this.clearSelection = function (e) {
	            e.preventDefault();
	            e.stopPropagation();
	            _this.setState({ value: [] });
	            _this.handleChange([]);
	        };
	        _this.clearHoverValue = function () {
	            return _this.setState({ hoverValue: [] });
	        };
	        _this.handleChange = function (value) {
	            var props = _this.props;
	            if (!('value' in props)) {
	                _this.setState(function (_ref) {
	                    var showDate = _ref.showDate;
	                    return {
	                        value: value,
	                        showDate: getShowDateFromValue(value) || showDate
	                    };
	                });
	            }
	            props.onChange(value, [formatValue(value[0], props.format), formatValue(value[1], props.format)]);
	        };
	        _this.handleOpenChange = function (open) {
	            if (!('open' in _this.props)) {
	                _this.setState({ open: open });
	            }
	            var onOpenChange = _this.props.onOpenChange;

	            if (onOpenChange) {
	                onOpenChange(open);
	            }
	        };
	        _this.handleShowDateChange = function (showDate) {
	            return _this.setState({ showDate: showDate });
	        };
	        _this.handleHoverChange = function (hoverValue) {
	            return _this.setState({ hoverValue: hoverValue });
	        };
	        _this.renderFooter = function () {
	            var _this$props = _this.props,
	                prefixCls = _this$props.prefixCls,
	                ranges = _this$props.ranges,
	                renderExtraFooter = _this$props.renderExtraFooter;

	            if (!ranges && !renderExtraFooter) {
	                return null;
	            }
	            var customFooter = renderExtraFooter ? _react2['default'].createElement(
	                'div',
	                { className: prefixCls + '-footer-extra', key: 'extra' },
	                renderExtraFooter.apply(undefined, arguments)
	            ) : null;
	            var operations = Object.keys(ranges || {}).map(function (range) {
	                var value = ranges[range];
	                return _react2['default'].createElement(
	                    'a',
	                    { key: range, onClick: function onClick() {
	                            return _this.setValue(value, true);
	                        }, onMouseEnter: function onMouseEnter() {
	                            return _this.setState({ hoverValue: value });
	                        }, onMouseLeave: _this.clearHoverValue },
	                    range
	                );
	            });
	            var rangeNode = _react2['default'].createElement(
	                'div',
	                { className: prefixCls + '-footer-extra ' + prefixCls + '-range-quick-selector', key: 'range' },
	                operations
	            );
	            return [rangeNode, customFooter];
	        };
	        var value = props.value || props.defaultValue || [];
	        if (value[0] && !_moment2['default'].isMoment(value[0]) || value[1] && !_moment2['default'].isMoment(value[1])) {
	            throw new Error('The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, ' + 'see: https://u.ant.design/date-picker-value');
	        }
	        var pickerValue = !value || isEmptyArray(value) ? props.defaultPickerValue : value;
	        _this.state = {
	            value: value,
	            showDate: pickerValueAdapter(pickerValue || (0, _moment2['default'])()),
	            open: props.open,
	            hoverValue: []
	        };
	        return _this;
	    }