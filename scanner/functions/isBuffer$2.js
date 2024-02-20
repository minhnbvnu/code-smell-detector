function isBuffer$2(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer$1(obj) || isSlowBuffer$1(obj));
	}