function nextFrame() {
	  return new Promise(function (resolve) {
	    return delayCallback(function () {
	      return resolve();
	    });
	  });
	}