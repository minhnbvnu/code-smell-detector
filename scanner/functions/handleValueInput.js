function handleValueInput(promise, args, nodeFunc, self) {
	  var result = tryApply(nodeFunc, self, args);
	  if (result === ERROR) {
	    reject(promise, result.value);
	  }
	  return promise;
	}