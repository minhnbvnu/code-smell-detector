function isMediaStreamActive() {
	        if ('active' in mediaStream) {
	            if (!mediaStream.active) {
	                return false;
	            }
	        } else if ('ended' in mediaStream) { // old hack
	            if (mediaStream.ended) {
	                return false;
	            }
	        }
	    }