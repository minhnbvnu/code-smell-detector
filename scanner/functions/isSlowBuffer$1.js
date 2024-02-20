function isSlowBuffer$1(obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer$1(obj.slice(0, 0));
	}