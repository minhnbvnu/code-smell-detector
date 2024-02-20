function getDefaultActiveKey(props) {
	  var activeKey = void 0;
	  _react2['default'].Children.forEach(props.children, function (child) {
	    if (child && !activeKey && !child.props.disabled) {
	      activeKey = child.key;
	    }
	  });
	  return activeKey;
	}