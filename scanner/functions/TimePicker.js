function TimePicker(props) {
	        (0, _classCallCheck3['default'])(this, TimePicker);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

	        _this.handleChange = function (value) {
	            if (!('value' in _this.props)) {
	                _this.setState({ value: value });
	            }
	            var _this$props = _this.props,
	                onChange = _this$props.onChange,
	                _this$props$format = _this$props.format,
	                format = _this$props$format === undefined ? 'HH:mm:ss' : _this$props$format;

	            if (onChange) {
	                onChange(value, value && value.format(format) || '');
	            }
	        };
	        _this.handleOpenClose = function (_ref) {
	            var open = _ref.open;
	            var onOpenChange = _this.props.onOpenChange;

	            if (onOpenChange) {
	                onOpenChange(open);
	            }
	        };
	        _this.saveTimePicker = function (timePickerRef) {
	            _this.timePickerRef = timePickerRef;
	        };
	        var value = props.value || props.defaultValue;
	        if (value && !_moment2['default'].isMoment(value)) {
	            throw new Error('The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' + 'see: https://u.ant.design/time-picker-value');
	        }
	        _this.state = {
	            value: value
	        };
	        return _this;
	    }