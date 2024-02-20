function resolveSingle(promise, label) {
	  return Promise.resolve(promise, label).then(function (promises) {
	    return resolveAll(promises, label);
	  });
	}