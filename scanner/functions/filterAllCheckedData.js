function filterAllCheckedData(vs, treeNodes) {
	  var vals = [].concat(vs);
	  if (!vals.length) {
	    return vals;
	  }

	  var data = recursiveGen(treeNodes);
	  var checkedNodesPositions = [];

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
	  checkChildren(data);
	  checkParent(data);

	  checkedNodesPositions.forEach(function (i, index) {
	    // clear private metadata
	    delete checkedNodesPositions[index].node.__checked;
	    delete checkedNodesPositions[index].node._pos;
	    // create the same structure of `onCheck`'s return.
	    checkedNodesPositions[index].node.props = {
	      title: checkedNodesPositions[index].node.title,
	      label: checkedNodesPositions[index].node.label || checkedNodesPositions[index].node.title,
	      value: checkedNodesPositions[index].node.value
	    };
	    if (checkedNodesPositions[index].node.children) {
	      checkedNodesPositions[index].node.props.children = checkedNodesPositions[index].node.children;
	    }
	    delete checkedNodesPositions[index].node.title;
	    delete checkedNodesPositions[index].node.label;
	    delete checkedNodesPositions[index].node.value;
	    delete checkedNodesPositions[index].node.children;
	  });
	  return checkedNodesPositions;
	}