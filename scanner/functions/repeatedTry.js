function repeatedTry(checkFn, delayFn, maxCounter) {
	  if (delayFn === void 0) {
	    delayFn = function delayFn(counter) {
	      return 0;
	    };
	  }

	  return new Promise(function (resolve, reject) {
	    var tryCount = 0;

	    var tryFn = function tryFn() {
	      if (checkFn()) {
	        resolve();
	        return;
	      }

	      tryCount++;
	      var nextBackoff = delayFn(tryCount);

	      if (maxCounter != null && tryCount >= maxCounter) {
	        reject();
	        return;
	      }

	      setTimeout(tryFn, nextBackoff);
	    };

	    tryFn();
	  });
	}