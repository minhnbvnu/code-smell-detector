function defProp(obj, name, value) {
	  if (originalDefProp) try {
	    originalDefProp.call(originalObject, obj, name, { value: value });
	  } catch (definePropertyIsBrokenInIE8) {
	    obj[name] = value;
	  } else {
	    obj[name] = value;
	  }
	}