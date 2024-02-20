function getCheck(treeNodesStates, checkedPositions) {
	  var halfCheckedKeys = [];
	  var checkedKeys = [];
	  var checkedNodes = [];
	  Object.keys(treeNodesStates).forEach(function (item) {
	    var itemObj = treeNodesStates[item];
	    if (itemObj.checked) {
	      checkedKeys.push(itemObj.key);
	      // checkedNodes.push(getValuePropValue(itemObj.node));
	      checkedNodes.push((0, _extends3['default'])({}, itemObj, { pos: item }));
	    } else if (itemObj.halfChecked) {
	      halfCheckedKeys.push(itemObj.key);
	    }
	  });
	  return {
	    halfCheckedKeys: halfCheckedKeys, checkedKeys: checkedKeys, checkedNodes: checkedNodes, treeNodesStates: treeNodesStates, checkedPositions: checkedPositions
	  };
	}