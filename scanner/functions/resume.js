function resume(key, arg) {
	    try {
	      var result = gen[key](arg);
	      var value = result.value;
	      var wrappedAwait = value instanceof _AwaitValue;
	      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
	        if (wrappedAwait) {
	          resume(key === "return" ? "return" : "next", arg);
	          return;
	        }

	        settle(result.done ? "return" : "normal", arg);
	      }, function (err) {
	        resume("throw", err);
	      });
	    } catch (err) {
	      settle("throw", err);
	    }
	  }