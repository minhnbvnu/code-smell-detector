function handlePromiseInput(promise, args, nodeFunc, self) {
	  return Promise.all(args).then(function (args) {
	    var result = tryApply(nodeFunc, self, args);
	    if (result === ERROR) {
	      reject(promise, result.value);
	    }
	    return promise;
	  });
	}