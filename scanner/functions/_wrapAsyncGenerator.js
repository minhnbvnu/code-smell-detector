function _wrapAsyncGenerator(fn) {
	  return function () {
	    return new _AsyncGenerator(fn.apply(this, arguments));
	  };
	}