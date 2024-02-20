function getCheckedValue(children) {
	    var value = null;
	    var matched = false;
	    _react2['default'].Children.forEach(children, function (radio) {
	        if (radio && radio.props && radio.props.checked) {
	            value = radio.props.value;
	            matched = true;
	        }
	    });
	    return matched ? { value: value } : undefined;
	}