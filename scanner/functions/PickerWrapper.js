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