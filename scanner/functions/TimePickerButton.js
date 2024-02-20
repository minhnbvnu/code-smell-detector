function TimePickerButton(_ref) {
	  var _classnames;

	  var prefixCls = _ref.prefixCls,
	      locale = _ref.locale,
	      showTimePicker = _ref.showTimePicker,
	      onOpenTimePicker = _ref.onOpenTimePicker,
	      onCloseTimePicker = _ref.onCloseTimePicker,
	      timePickerDisabled = _ref.timePickerDisabled;

	  var className = (0, _classnames3['default'])((_classnames = {}, (0, _defineProperty3['default'])(_classnames, prefixCls + '-time-picker-btn', true), (0, _defineProperty3['default'])(_classnames, prefixCls + '-time-picker-btn-disabled', timePickerDisabled), _classnames));
	  var onClick = null;
	  if (!timePickerDisabled) {
	    onClick = showTimePicker ? onCloseTimePicker : onOpenTimePicker;
	  }
	  return _react2['default'].createElement(
	    'a',
	    {
	      className: className,
	      role: 'button',
	      onClick: onClick
	    },
	    showTimePicker ? locale.dateSelect : locale.timeSelect
	  );
	}