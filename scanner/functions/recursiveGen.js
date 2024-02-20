function recursiveGen(children) {
	  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  return _react2['default'].Children.map(children, function (child, index) {
	    var pos = level + '-' + index;
	    var o = {
	      title: child.props.title,
	      label: child.props.label || child.props.title,
	      value: child.props.value,
	      key: child.key,
	      _pos: pos
	    };
	    if (child.props.children) {
	      o.children = recursiveGen(child.props.children, pos);
	    }
	    return o;
	  });
	}