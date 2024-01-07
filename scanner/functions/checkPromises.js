function checkPromises(promises) {
	    assert(promises != null && Array.isArray(promises) && promises.length > 0, function () {
	      return 'promises must be a none empty array';
	    });
	  }