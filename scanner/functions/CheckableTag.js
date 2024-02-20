function CheckableTag() {
	        (0, _classCallCheck3['default'])(this, CheckableTag);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (CheckableTag.__proto__ || Object.getPrototypeOf(CheckableTag)).apply(this, arguments));

	        _this.handleClick = function () {
	            var _this$props = _this.props,
	                checked = _this$props.checked,
	                onChange = _this$props.onChange;

	            if (onChange) {
	                onChange(!checked);
	            }
	        };
	        return _this;
	    }