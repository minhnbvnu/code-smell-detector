function recursiveCloneChildren(children) {
	  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (ch) {
	    return ch;
	  };

	  // return React.Children.map(children, child => {
	  return Array.from(children).map(function (child) {
	    var newChild = cb(child);
	    if (newChild && newChild.props && newChild.props.children) {
	      return _react2['default'].cloneElement(newChild, {}, recursiveCloneChildren(newChild.props.children, cb));
	    }
	    return newChild;
	  });
	}