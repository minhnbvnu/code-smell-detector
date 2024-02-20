function handleCheckState(obj, checkedPositionArr, checkIt) {
	  // console.log(stripTail('0-101-000'));
	  // let s = Date.now();
	  var objKeys = Object.keys(obj);

	  objKeys.forEach(function (i, index) {
	    var iArr = splitPosition(i);
	    var saved = false;
	    checkedPositionArr.forEach(function (_pos) {
	      var _posArr = splitPosition(_pos);
	      if (iArr.length > _posArr.length && isInclude(_posArr, iArr)) {
	        obj[i].halfChecked = false;
	        obj[i].checked = checkIt;
	        objKeys[index] = null;
	      }
	      if (iArr[0] === _posArr[0] && iArr[1] === _posArr[1]) {
	        saved = true;
	      }
	    });
	    if (!saved) {
	      objKeys[index] = null;
	    }
	  });
	  objKeys = objKeys.filter(function (i) {
	    return i;
	  }); // filter non null;

	  var _loop3 = function _loop3(_pIndex) {
	    // loop to set ancestral nodes's `checked` or `halfChecked`
	    var loop = function loop(__pos) {
	      var _posLen = splitPosition(__pos).length;
	      if (_posLen <= 2) {
	        // e.g. '0-0', '0-1'
	        return;
	      }
	      var sibling = 0;
	      var siblingChecked = 0;
	      var parentPosition = stripTail(__pos);
	      objKeys.forEach(function (i /* , index*/) {
	        var iArr = splitPosition(i);
	        if (iArr.length === _posLen && isInclude(splitPosition(parentPosition), iArr)) {
	          sibling++;
	          if (obj[i].checked) {
	            siblingChecked++;
	            var _i = checkedPositionArr.indexOf(i);
	            if (_i > -1) {
	              checkedPositionArr.splice(_i, 1);
	              if (_i <= _pIndex) {
	                _pIndex--;
	              }
	            }
	          } else if (obj[i].halfChecked) {
	            siblingChecked += 0.5;
	          }
	          // objKeys[index] = null;
	        }
	      });
	      // objKeys = objKeys.filter(i => i); // filter non null;
	      var parent = obj[parentPosition];
	      // not check, checked, halfChecked
	      if (siblingChecked === 0) {
	        parent.checked = false;
	        parent.halfChecked = false;
	      } else if (siblingChecked === sibling) {
	        parent.checked = true;
	        parent.halfChecked = false;
	      } else {
	        parent.halfChecked = true;
	        parent.checked = false;
	      }
	      loop(parentPosition);
	    };
	    loop(checkedPositionArr[_pIndex], _pIndex);
	    pIndex = _pIndex;
	  };

	  for (var pIndex = 0; pIndex < checkedPositionArr.length; pIndex++) {
	    _loop3(pIndex);
	  }
	  // console.log(Date.now()-s, objKeys.length, checkIt);
	}