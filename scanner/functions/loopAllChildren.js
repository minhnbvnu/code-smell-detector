function loopAllChildren(childs, callback, parent) {
	  var loop = function loop(children, level, _parent) {
	    var len = getChildrenlength(children);
	    _react2['default'].Children.forEach(children, function handler(item, index) {
	      // eslint-disable-line
	      var pos = level + '-' + index;
	      if (item && item.props.children && item.type) {
	        loop(item.props.children, pos, { node: item, pos: pos });
	      }
	      if (item) {
	        callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}), _parent);
	      }
	    });
	  };
	  loop(childs, 0, parent);
	}