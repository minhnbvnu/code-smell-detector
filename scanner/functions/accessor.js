function accessor(object) {
	    if (!hasOwn.call(object, brand)) register(object);
	    return object[brand](passkey);
	  }