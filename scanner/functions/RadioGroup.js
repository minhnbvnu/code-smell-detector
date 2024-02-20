function RadioGroup(props) {
	        (0, _classCallCheck3['default'])(this, RadioGroup);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

	        _this.onRadioChange = function (ev) {
	            var lastValue = _this.state.value;
	            var value = ev.target.value;

	            if (!('value' in _this.props)) {
	                _this.setState({
	                    value: value
	                });
	            }
	            var onChange = _this.props.onChange;
	            if (onChange && value !== lastValue) {
	                onChange(ev);
	            }
	        };
	        var value = void 0;
	        if ('value' in props) {
	            value = props.value;
	        } else if ('defaultValue' in props) {
	            value = props.defaultValue;
	        } else {
	            var checkedValue = getCheckedValue(props.children);
	            value = checkedValue && checkedValue.value;
	        }
	        _this.state = {
	            value: value
	        };
	        return _this;
	    }