function loopTreeData(data) {
	  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  return data.map(function (item, index) {
	    var pos = level + '-' + index;
	    var label = item.label,
	        value = item.value,
	        disabled = item.disabled,
	        key = item.key,
	        hasOwnProperty = item.hasOwnProperty,
	        selectable = item.selectable,
	        children = item.children,
	        isLeaf = item.isLeaf,
	        otherProps = (0, _objectWithoutProperties3['default'])(item, ['label', 'value', 'disabled', 'key', 'hasOwnProperty', 'selectable', 'children', 'isLeaf']);

	    var props = (0, _extends3['default'])({
	      value: value,
	      title: label,
	      // value: value || String(key || label), // cause onChange callback error
	      key: key || value || pos,
	      disabled: disabled || false,
	      selectable: selectable === false ? selectable : true
	    }, otherProps);
	    var ret = void 0;
	    if (children && children.length) {
	      ret = _react2['default'].createElement(
	        _TreeNode3['default'],
	        props,
	        loopTreeData(children, pos)
	      );
	    } else {
	      ret = _react2['default'].createElement(_TreeNode3['default'], (0, _extends3['default'])({}, props, { isLeaf: isLeaf }));
	    }
	    return ret;
	  });
	}