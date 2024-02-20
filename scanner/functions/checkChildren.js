function checkChildren(children) {
	    children.forEach(function (item) {
	      if (item.__checked) {
	        return;
	      }
	      var ci = vals.indexOf(item.value);
	      var childs = item.children;
	      if (ci > -1) {
	        item.__checked = true;
	        checkedNodesPositions.push({ node: item, pos: item._pos });
	        vals.splice(ci, 1);
	        if (childs) {
	          recursive(childs, function (child) {
	            child.__checked = true;
	            checkedNodesPositions.push({ node: child, pos: child._pos });
	          });
	        }
	      } else {
	        if (childs) {
	          checkChildren(childs);
	        }
	      }
	    });
	  }