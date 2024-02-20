function labelCompatible(prop) {
	  var newProp = prop;
	  if (newProp === 'label') {
	    newProp = 'title';
	  }
	  return newProp;
	}