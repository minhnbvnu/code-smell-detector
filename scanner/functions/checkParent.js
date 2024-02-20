function checkParent(children) {
	    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { root: true };

	    var siblingChecked = 0;
	    children.forEach(function (item) {
	      var childs = item.children;
	      if (childs && !item.__checked && !item.__halfChecked) {
	        var p = checkParent(childs, item);
	        if (p.__checked) {
	          siblingChecked++;
	        } else if (p.__halfChecked) {
	          siblingChecked += 0.5;
	        }
	      } else if (item.__checked) {
	        siblingChecked++;
	      } else if (item.__halfChecked) {
	        siblingChecked += 0.5;
	      }
	    });
	    var len = children.length;
	    if (siblingChecked === len) {
	      parent.__checked = true;
	      checkedNodesPositions.push({ node: parent, pos: parent._pos });
	    } else if (siblingChecked < len && siblingChecked > 0) {
	      parent.__halfChecked = true;
	    }
	    if (parent.root) {
	      return children;
	    }
	    return parent;
	  }