function send(key, arg) {
	    return new Promise(function (resolve, reject) {
	      var request = {
	        key: key,
	        arg: arg,
	        resolve: resolve,
	        reject: reject,
	        next: null
	      };

	      if (back) {
	        back = back.next = request;
	      } else {
	        front = back = request;
	        resume(key, arg);
	      }
	    });
	  }