function purgeDeep(id) {
	  var item = getItem(id);
	  if (item) {
	    var childIDs = item.childIDs;
	
	    removeItem(id);
	    childIDs.forEach(purgeDeep);
	  }
	}