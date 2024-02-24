function createPicker(TheCalendar) {
	    return _a = function (_React$Component) {
	        (0, _inherits3['default'])(CalenderWrapper, _React$Component);

	        function CalenderWrapper(props) {
	            (0, _classCallCheck3['default'])(this, CalenderWrapper);

	            var _this = (0, _possibleConstructorReturn3['default'])(this, (CalenderWrapper.__proto__ || Object.getPrototypeOf(CalenderWrapper)).call(this, props));

	            _this.renderFooter = function () {
	                var _this$props = _this.props,
	                    prefixCls = _this$props.prefixCls,
	                    renderExtraFooter = _this$props.renderExtraFooter;

	                return renderExtraFooter ? _react2['default'].createElement(
	                    'div',
	                    { className: prefixCls + '-footer-extra' },
	                    renderExtraFooter.apply(undefined, arguments)
	                ) : null;
	            };
	            _this.clearSelection = function (e) {
	                e.preventDefault();
	                e.stopPropagation();
	                _this.handleChange(null);
	            };
	            _this.handleChange = function (value) {
	                var props = _this.props;
	                if (!('value' in props)) {
	                    _this.setState({
	                        value: value,
	                        showDate: value
	                    });
	                }
	                props.onChange(value, value && value.format(props.format) || '');
	            };
	            _this.handleCalendarChange = function (value) {
	                _this.setState({ showDate: value });
	            };
	            var value = props.value || props.defaultValue;
	            if (value && !_moment2['default'].isMoment(value)) {
	                throw new Error('The value/defaultValue of DatePicker or MonthPicker must be ' + 'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value');
	            }
	            _this.state = {
	                value: value,
	                showDate: value
	            };
	            return _this;
	        }

	        (0, _createClass3['default'])(CalenderWrapper, [{
	            key: 'componentWillReceiveProps',
	            value: function componentWillReceiveProps(nextProps) {
	                if ('value' in nextProps) {
	                    this.setState({
	                        value: nextProps.value,
	                        showDate: nextProps.value
	                    });
	                }
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                var _classNames;

	                var _state = this.state,
	                    value = _state.value,
	                    showDate = _state.showDate;

	                var props = (0, _omit2['default'])(this.props, ['onChange']);
	                var prefixCls = props.prefixCls,
	                    locale = props.locale;

	                var placeholder = 'placeholder' in props ? props.placeholder : locale.lang.placeholder;
	                var disabledTime = props.showTime ? props.disabledTime : null;
	                var calendarClassName = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-time', props.showTime), (0, _defineProperty3['default'])(_classNames, prefixCls + '-month', _MonthCalendar2['default'] === TheCalendar), _classNames));
	                var pickerChangeHandler = {};
	                var calendarHandler = {};
	                if (props.showTime) {
	                    calendarHandler = {
	                        // fix https://github.com/ant-design/ant-design/issues/1902
	                        onSelect: this.handleChange
	                    };
	                } else {
	                    pickerChangeHandler = {
	                        onChange: this.handleChange
	                    };
	                }
	                (0, _warning2['default'])(!('onOK' in props), 'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!');
	                var calendar = _react2['default'].createElement(TheCalendar, (0, _extends3['default'])({}, calendarHandler, { disabledDate: props.disabledDate, disabledTime: disabledTime, locale: locale.lang, timePicker: props.timePicker, defaultValue: props.defaultPickerValue || (0, _moment2['default'])(), dateInputPlaceholder: placeholder, prefixCls: prefixCls, className: calendarClassName, onOk: props.onOk, format: props.format, showToday: props.showToday, monthCellContentRender: props.monthCellContentRender, renderFooter: this.renderFooter, onChange: this.handleCalendarChange, value: showDate }));
	                // default width for showTime
	                var pickerStyle = {};
	                if (props.showTime) {
	                    pickerStyle.width = props.style && props.style.width || 154;
	                }
	                var clearIcon = !props.disabled && props.allowClear && value ? _react2['default'].createElement(_icon2['default'], { type: 'cross-circle', className: prefixCls + '-picker-clear', onClick: this.clearSelection }) : null;
	                var input = function input(_ref) {
	                    var inputValue = _ref.value;
	                    return _react2['default'].createElement(
	                        'div',
	                        null,
	                        _react2['default'].createElement('input', { disabled: props.disabled, readOnly: true, value: inputValue && inputValue.format(props.format) || '', placeholder: placeholder, className: props.pickerInputClass }),
	                        clearIcon,
	                        _react2['default'].createElement('span', { className: prefixCls + '-picker-icon' })
	                    );
	                };
	                var pickerValue = value;
	                var localeCode = (0, _getLocale.getLocaleCode)(this.context);
	                if (pickerValue && localeCode) {
	                    pickerValue.locale(localeCode);
	                }
	                var style = (0, _extends3['default'])({}, props.style, pickerStyle);
	                return _react2['default'].createElement(
	                    'span',
	                    { className: (0, _classnames2['default'])(props.className, props.pickerClass), style: style },
	                    _react2['default'].createElement(
	                        _Picker2['default'],
	                        (0, _extends3['default'])({}, props, pickerChangeHandler, { calendar: calendar, value: value, prefixCls: prefixCls + '-picker-container', style: props.popupStyle }),
	                        input
	                    )
	                );
	            }
	        }]);
	        return CalenderWrapper;
	    }(_react2['default'].Component), _a.contextTypes = {
	        antLocale: _propTypes2['default'].object
	    }, _a.defaultProps = {
	        prefixCls: 'ant-calendar',
	        allowClear: true,
	        showToday: true
	    }, _a;
	    var _a;
	}