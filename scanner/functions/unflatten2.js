function unflatten2(array) {
	    var _ref;

	    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_ref = {}, _ref[format.id] = format.rootPId, _ref);

	    var children = [];
	    for (var i = 0; i < array.length; i++) {
	      array[i] = (0, _extends3['default'])({}, array[i]); // copy, can not corrupts original data
	      if (array[i][format.pId] === parent[format.id]) {
	        array[i].key = array[i][format.id];
	        children.push(array[i]);
	        array.splice(i--, 1);
	      }
	    }
	    if (children.length) {
	      parent.children = children;
	      children.forEach(function (child) {
	        return unflatten2(array, child);
	      });
	    }
	    if (parent[format.id] === format.rootPId) {
	      return children;
	    }
	  }