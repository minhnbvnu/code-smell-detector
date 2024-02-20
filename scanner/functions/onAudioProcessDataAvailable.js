function onAudioProcessDataAvailable(e) {
	        if (isPaused) {
	            return;
	        }

	        if (isMediaStreamActive() === false) {
	            if (!config.disableLogs) {
	                console.error('MediaStream seems stopped.');
	            }
	            jsAudioNode.disconnect();
	            recording = false;
	        }

	        if (!recording) {
	            audioInput.disconnect();
	            return;
	        }

	        /**
	         * This method is called on "onaudioprocess" event's first invocation.
	         * @method {function} onAudioProcessStarted
	         * @memberof StereoAudioRecorder
	         * @example
	         * recorder.onAudioProcessStarted: function() { };
	         */
	        if (!isAudioProcessStarted) {
	            isAudioProcessStarted = true;
	            if (config.onAudioProcessStarted) {
	                config.onAudioProcessStarted();
	            }

	            if (config.initCallback) {
	                config.initCallback();
	            }
	        }

	        var left = e.inputBuffer.getChannelData(0);

	        // we clone the samples
	        leftchannel.push(new Float32Array(left));

	        if (numberOfAudioChannels === 2) {
	            var right = e.inputBuffer.getChannelData(1);
	            rightchannel.push(new Float32Array(right));
	        }

	        recordingLength += bufferSize;
	    }