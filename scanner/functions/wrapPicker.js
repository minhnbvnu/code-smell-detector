function wrapPicker(Picker, defaultFormat) {
	    return _a = function (_React$Component) {
	        (0, _inherits3['default'])(PickerWrapper, _React$Component);

	        function PickerWrapper() {
	            (0, _classCallCheck3['default'])(this, PickerWrapper);

	            var _this = (0, _possibleConstructorReturn3['default'])(this, (PickerWrapper.__proto__ || Object.getPrototypeOf(PickerWrapper)).apply(this, arguments));

	            _this.handleOpenChange = function (open) {
	                var _this$props = _this.props,
	                    onOpenChange = _this$props.onOpenChange,
	                    toggleOpen = _this$props.toggleOpen;

	                onOpenChange(open);
	                if (toggleOpen) {
	                    (0, _warning2['default'])(false, '`toggleOpen` is deprecated and will be removed in the future, ' + 'please use `onOpenChange` instead, see: https://u.ant.design/date-picker-on-open-change');
	                    toggleOpen({ open: open });
	                }
	            };
	            return _this;
	        }

	        (0, _createClass3['default'])(PickerWrapper, [{
	            key: 'render',
	            value: function render() {
	                var _classNames2;

	                var props = this.props;
	                var prefixCls = props.prefixCls,
	                    inputPrefixCls = props.inputPrefixCls;

	                var pickerClass = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, prefixCls + '-picker', true));
	                var pickerInputClass = (0, _classnames2['default'])(prefixCls + '-picker-input', inputPrefixCls, (_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-lg', props.size === 'large'), (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-sm', props.size === 'small'), (0, _defineProperty3['default'])(_classNames2, inputPrefixCls + '-disabled', props.disabled), _classNames2));
	                var locale = (0, _getLocale.getComponentLocale)(props, this.context, 'DatePicker', function () {
	                    return __webpack_require__(919);
	                });
	                var timeFormat = props.showTime && props.showTime.format || 'HH:mm:ss';
	                var rcTimePickerProps = (0, _extends3['default'])({}, (0, _timePicker.generateShowHourMinuteSecond)(timeFormat), { format: timeFormat, use12Hours: props.showTime && props.showTime.use12Hours });
	                var columns = getColumns(rcTimePickerProps);
	                var timePickerCls = prefixCls + '-time-picker-column-' + columns;
	                var timePicker = props.showTime ? _react2['default'].createElement(_Panel2['default'], (0, _extends3['default'])({}, rcTimePickerProps, props.showTime, { prefixCls: prefixCls + '-time-picker', className: timePickerCls, placeholder: locale.timePickerLocale.placeholder, transitionName: 'slide-up' })) : null;
	                return _react2['default'].createElement(Picker, (0, _extends3['default'])({}, props, { pickerClass: pickerClass, pickerInputClass: pickerInputClass, locale: locale, timePicker: timePicker, onOpenChange: this.handleOpenChange }));
	            }
	        }]);
	        return PickerWrapper;
	    }(_react2['default'].Component), _a.contextTypes = {
	        antLocale: _propTypes2['default'].object
	    }, _a.defaultProps = {
	        format: defaultFormat || 'YYYY-MM-DD',
	        transitionName: 'slide-up',
	        popupStyle: {},
	        onChange: function onChange() {},
	        onOk: function onOk() {},
	        onOpenChange: function onOpenChange() {},

	        locale: {},
	        prefixCls: 'ant-calendar',
	        inputPrefixCls: 'ant-input'
	    }, _a;
	    var _a;
	}