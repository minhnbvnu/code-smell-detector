function flatToHierarchy(arr) {
	  if (!arr.length) {
	    return arr;
	  }
	  var hierarchyNodes = [];
	  var levelObj = {};
	  arr.forEach(function (item) {
	    if (!item.pos) {
	      return;
	    }
	    var posLen = item.pos.split('-').length;
	    if (!levelObj[posLen]) {
	      levelObj[posLen] = [];
	    }
	    levelObj[posLen].push(item);
	  });
	  var levelArr = Object.keys(levelObj).sort(function (a, b) {
	    return b - a;
	  });
	  // const s = Date.now();
	  // todo: there are performance issues!
	  levelArr.reduce(function (pre, cur) {
	    if (cur && cur !== pre) {
	      levelObj[pre].forEach(function (item) {
	        var haveParent = false;
	        levelObj[cur].forEach(function (ii) {
	          if (isInclude(ii.pos.split('-'), item.pos.split('-'))) {
	            haveParent = true;
	            if (!ii.children) {
	              ii.children = [];
	            }
	            ii.children.push(item);
	          }
	        });
	        if (!haveParent) {
	          hierarchyNodes.push(item);
	        }
	      });
	    }
	    return cur;
	  });
	  // console.log(Date.now() - s);
	  return levelObj[levelArr[levelArr.length - 1]].concat(hierarchyNodes);
	}