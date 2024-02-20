function RecordRTCConfiguration(mediaStream, config) {
	    if (config.recorderType && !config.type) {
	        if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder) {
	            config.type = 'video';
	        } else if (config.recorderType === GifRecorder) {
	            config.type = 'gif';
	        } else if (config.recorderType === StereoAudioRecorder) {
	            config.type = 'audio';
	        } else if (config.recorderType === MediaStreamRecorder) {
	            if (mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
	                config.type = 'video';
	            } else if (mediaStream.getAudioTracks().length && !mediaStream.getVideoTracks().length) {
	                config.type = 'audio';
	            } else if (!mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
	                config.type = 'audio';
	            } else {
	                // config.type = 'UnKnown';
	            }
	        }
	    }

	    if (typeof MediaStreamRecorder !== 'undefined' && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
	        if (!config.mimeType) {
	            config.mimeType = 'video/webm';
	        }

	        if (!config.type) {
	            config.type = config.mimeType.split('/')[0];
	        }

	        if (!config.bitsPerSecond) {
	            // config.bitsPerSecond = 128000;
	        }
	    }

	    // consider default type=audio
	    if (!config.type) {
	        if (config.mimeType) {
	            config.type = config.mimeType.split('/')[0];
	        }
	        if (!config.type) {
	            config.type = 'audio';
	        }
	    }

	    return config;
	}