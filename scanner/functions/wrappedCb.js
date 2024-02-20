function wrappedCb(e) {
	            if (e) {
	                normalizedCb(e);
	            }
	            else {
	                create.call(fsType, normalizedOpts, normalizedCb);
	            }
	        }