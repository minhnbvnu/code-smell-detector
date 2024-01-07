function getUniqueTensorName(scopedName) {
	  if (!isValidTensorName(scopedName)) {
	    throw new Error('Not a valid tensor name: \'' + scopedName + '\'');
	  }

	  if (!nameMap.has(scopedName)) {
	    nameMap.set(scopedName, 0);
	  }

	  var index = nameMap.get(scopedName);
	  nameMap.set(scopedName, nameMap.get(scopedName) + 1);

	  if (index > 0) {
	    var result = scopedName + "_" + index; // Mark the composed name as used in case someone wants
	    // to call getUniqueTensorName("name_1").

	    nameMap.set(result, 1);
	    return result;
	  } else {
	    return scopedName;
	  }
	}