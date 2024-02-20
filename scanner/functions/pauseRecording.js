function pauseRecording() {
	        if (!mediaRecorder) {
	            return console.warn(WARNING);
	        }

	        mediaRecorder.pause();

	        if (!config.disableLogs) {
	            console.debug('Paused recording.');
	        }
	    }