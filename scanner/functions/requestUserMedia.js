function requestUserMedia(constraints) {
	  return new Promise(function(resolve, reject) {
	    getUserMedia(constraints, resolve, reject);
	  });
	}