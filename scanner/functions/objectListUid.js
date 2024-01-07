function objectListUid(objs) {
	  var objectList = toList(objs);
	  var retVal = '';

	  for (var _iterator2 = _createForOfIteratorHelperLoose(objectList), _step2; !(_step2 = _iterator2()).done;) {
	    var obj = _step2.value;

	    if (obj.id == null) {
	      throw new ValueError("Object " + obj + " passed to objectListUid without an id");
	    }

	    if (retVal !== '') {
	      retVal = retVal + ', ';
	    }

	    retVal = "" + retVal + Math.abs(obj.id);
	  }

	  return retVal;
	}