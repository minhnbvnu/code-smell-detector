function wrapThenable(then, promise) {
	  return {
	    then: function (onFulFillment, onRejection) {
	      return then.call(promise, onFulFillment, onRejection);
	    }
	  };
	}