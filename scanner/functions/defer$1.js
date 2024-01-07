function defer$1(f) {
	  return new Promise(function (resolve) {
	    return setTimeout(resolve);
	  }).then(f);
	}