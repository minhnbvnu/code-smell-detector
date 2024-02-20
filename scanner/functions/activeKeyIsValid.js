function activeKeyIsValid(props, key) {
	  var keys = _react2['default'].Children.map(props.children, function (child) {
	    return child && child.key;
	  });
	  return keys.indexOf(key) >= 0;
	}