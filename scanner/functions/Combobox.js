function Combobox() {
	    var _ref;

	    var _temp, _this, _ret;

	    (0, _classCallCheck3['default'])(this, Combobox);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call.apply(_ref, [this].concat(args))), _this), _this.onItemChange = function (type, itemValue) {
	      var _this$props = _this.props,
	          onChange = _this$props.onChange,
	          defaultOpenValue = _this$props.defaultOpenValue,
	          use12Hours = _this$props.use12Hours;

	      var value = (_this.props.value || defaultOpenValue).clone();

	      if (type === 'hour') {
	        if (use12Hours) {
	          if (_this.isAM()) {
	            value.hour(+itemValue % 12);
	          } else {
	            value.hour(+itemValue % 12 + 12);
	          }
	        } else {
	          value.hour(+itemValue);
	        }
	      } else if (type === 'minute') {
	        value.minute(+itemValue);
	      } else if (type === 'ampm') {
	        var ampm = itemValue.toUpperCase();
	        if (use12Hours) {
	          if (ampm === 'PM' && value.hour() < 12) {
	            value.hour(value.hour() % 12 + 12);
	          }

	          if (ampm === 'AM') {
	            if (value.hour() >= 12) {
	              value.hour(value.hour() - 12);
	            }
	          }
	        }
	      } else {
	        value.second(+itemValue);
	      }
	      onChange(value);
	    }, _this.onEnterSelectPanel = function (range) {
	      _this.props.onCurrentSelectPanelChange(range);
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }