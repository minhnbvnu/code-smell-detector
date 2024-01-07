function monitorPromisesProgress(promises, onProgress, startFraction, endFraction) {
	  checkPromises(promises);
	  startFraction = startFraction == null ? 0 : startFraction;
	  endFraction = endFraction == null ? 1 : endFraction;
	  checkFraction(startFraction, endFraction);
	  var resolvedPromise = 0;

	  var registerMonitor = function registerMonitor(promise) {
	    promise.then(function (value) {
	      var fraction = startFraction + ++resolvedPromise / promises.length * (endFraction - startFraction); // pass fraction as parameter to callback function.

	      onProgress(fraction);
	      return value;
	    });
	    return promise;
	  };

	  function checkPromises(promises) {
	    assert(promises != null && Array.isArray(promises) && promises.length > 0, function () {
	      return 'promises must be a none empty array';
	    });
	  }

	  function checkFraction(startFraction, endFraction) {
	    assert(startFraction >= 0 && startFraction <= 1, function () {
	      return "Progress fraction must be in range [0, 1], but " + ("got startFraction " + startFraction);
	    });
	    assert(endFraction >= 0 && endFraction <= 1, function () {
	      return "Progress fraction must be in range [0, 1], but " + ("got endFraction " + endFraction);
	    });
	    assert(endFraction >= startFraction, function () {
	      return "startFraction must be no more than endFraction, but " + ("got startFraction " + startFraction + " and endFraction ") + ("" + endFraction);
	    });
	  }

	  return Promise.all(promises.map(registerMonitor));
	}