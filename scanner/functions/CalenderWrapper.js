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