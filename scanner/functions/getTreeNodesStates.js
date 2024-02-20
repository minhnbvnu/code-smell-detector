function getTreeNodesStates(children, values) {
	  var checkedPositions = [];
	  var treeNodesStates = {};
	  loopAllChildren(children, function (item, index, pos, keyOrPos, siblingPosition) {
	    treeNodesStates[pos] = {
	      node: item,
	      key: keyOrPos,
	      checked: false,
	      halfChecked: false,
	      siblingPosition: siblingPosition
	    };
	    if (values.indexOf(getValuePropValue(item)) !== -1) {
	      treeNodesStates[pos].checked = true;
	      checkedPositions.push(pos);
	    }
	  });

	  handleCheckState(treeNodesStates, filterParentPosition(checkedPositions.sort()), true);

	  return getCheck(treeNodesStates, checkedPositions);
	}