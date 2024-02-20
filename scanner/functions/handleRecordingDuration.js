function handleRecordingDuration() {
	        setTimeout(function() {
	            stopRecording(self.onRecordingStopped);
	        }, self.recordingDuration);
	    }