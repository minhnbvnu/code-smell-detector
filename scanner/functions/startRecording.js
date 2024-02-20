function startRecording() {
	        if (!config.disableLogs) {
	            console.debug('started recording ' + config.type + ' stream.');
	        }

	        if (mediaRecorder) {
	            mediaRecorder.clearRecordedData();
	            mediaRecorder.resume();

	            if (self.recordingDuration) {
	                handleRecordingDuration();
	            }
	            return self;
	        }

	        initRecorder(function() {
	            if (self.recordingDuration) {
	                handleRecordingDuration();
	            }
	        });

	        return self;
	    }