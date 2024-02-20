function updateCheckState(obj, checkedPosition, checkIt) {
	  var childrenLoop = function childrenLoop(parentObj) {
	    parentObj.childrenPos.forEach(function (childPos) {
	      var childObj = obj[childPos];
	      // User click don't change disabled item checked state
	      if (!childObj.disableCheckbox && !childObj.disabled) {
	        childObj.halfChecked = false;
	        childObj.checked = checkIt;
	      }
	      childrenLoop(childObj);
	    });
	  };

	  childrenLoop(obj[checkedPosition]);

	  var parentLoop = function parentLoop(childObj) {
	    if (!childObj.parentPos) return;
	    var parentObj = obj[childObj.parentPos];

	    var childrenCount = parentObj.childrenPos.length;

	    var checkedChildrenCount = 0;
	    parentObj.childrenPos.forEach(function (childPos) {
	      if (obj[childPos].disableCheckbox) {
	        childrenCount -= 1;
	        return;
	      }
	      if (obj[childPos].checked === true) checkedChildrenCount++;else if (obj[childPos].halfChecked === true) checkedChildrenCount += 0.5;
	    });

	    if (checkedChildrenCount === childrenCount) {
	      parentObj.checked = true;
	      parentObj.halfChecked = false;
	    } else if (checkedChildrenCount > 0) {
	      parentObj.halfChecked = true;
	      parentObj.checked = false;
	    } else {
	      parentObj.checked = false;
	      parentObj.halfChecked = false;
	    }
	    parentLoop(parentObj);
	  };

	  parentLoop(obj[checkedPosition]);
	}