function initRecorder(initCallback) {
	        if (!config.disableLogs) {
	            console.debug('initializing ' + config.type + ' stream recorder.');
	        }

	        if (initCallback) {
	            config.initCallback = function() {
	                initCallback();
	                initCallback = config.initCallback = null; // recordRTC.initRecorder should be call-backed once.
	            };
	        }

	        var Recorder = new GetRecorderType(mediaStream, config);

	        mediaRecorder = new Recorder(mediaStream, config);
	        mediaRecorder.record();
	    }