function isPromise(object) {
	  //  We chose to not use 'obj instanceOf Promise' for two reasons:
	  //  1. It only reliably works for es6 Promise, not other Promise
	  //  implementations.
	  //  2. It doesn't work with framework that uses zone.js. zone.js monkey patch
	  //  the async calls, so it is possible the obj (patched) is comparing to a
	  //  pre-patched Promise.
	  return object && object.then && typeof object.then === 'function';
	}