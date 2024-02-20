function validatorCallback(e) {
	        if (!callbackCalled) {
	            if (e) {
	                callbackCalled = true;
	                cb(e);
	            }
	            pendingValidators--;
	            if (pendingValidators === 0 && loopEnded) {
	                cb();
	            }
	        }
	    }