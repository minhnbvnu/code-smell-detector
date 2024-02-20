function traverseTreeNodes(treeNodes, callback) {
	  var traverse = function traverse(subTreeNodes, level, parentsChildrenPos, parentPos) {
	    if (Array.isArray(subTreeNodes)) {
	      subTreeNodes = subTreeNodes.filter(function (item) {
	        return !!item;
	      });
	    }
	    _react.Children.forEach(subTreeNodes, function (item, index) {
	      var pos = level + '-' + index;
	      parentsChildrenPos.push(pos); // Note: side effect

	      var childrenPos = [];
	      if (item.props.children && item.type && item.type.isTreeNode) {
	        traverse(item.props.children, pos, childrenPos, pos);
	      }
	      callback(item, index, pos, item.key || pos, childrenPos, parentPos);
	    });
	  };
	  traverse(treeNodes, 0, []);
	}