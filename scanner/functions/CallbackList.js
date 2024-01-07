function CallbackList(callbacks, queueLength) {
	    if (queueLength === void 0) {
	      queueLength = 10;
	    }

	    // TODO(cais): Make use of queueLength when implementing the queue for time
	    // values.
	    if (callbacks == null) {
	      callbacks = [];
	    }

	    this.callbacks = callbacks;
	    this.queueLength = queueLength;
	  }