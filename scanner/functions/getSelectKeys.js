function getSelectKeys(menuItems, value) {
	  if (value === null || value === undefined) {
	    return [];
	  }
	  var selectedKeys = [];
	  _react2['default'].Children.forEach(menuItems, function (item) {
	    if (item.type.isMenuItemGroup) {
	      selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
	    } else {
	      var itemValue = getValuePropValue(item);
	      var itemKey = item.key;
	      if (findIndexInValueByKey(value, itemValue) !== -1 && itemKey) {
	        selectedKeys.push(itemKey);
	      }
	    }
	  });
	  return selectedKeys;
	}