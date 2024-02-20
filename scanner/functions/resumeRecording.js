function resumeRecording() {
	        if (!mediaRecorder) {
	            return console.warn(WARNING);
	        }

	        // not all libs yet having  this method
	        mediaRecorder.resume();

	        if (!config.disableLogs) {
	            console.debug('Resumed recording.');
	        }
	    }