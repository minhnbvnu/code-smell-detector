function GetRecorderType(mediaStream, config) {
	    var recorder;

	    // StereoAudioRecorder can work with all three: Edge, Firefox and Chrome
	    // todo: detect if it is Edge, then auto use: StereoAudioRecorder
	    if (isChrome || isEdge || isOpera) {
	        // Media Stream Recording API has not been implemented in chrome yet;
	        // That's why using WebAudio API to record stereo audio in WAV format
	        recorder = StereoAudioRecorder;
	    }

	    if (typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype && !isChrome) {
	        recorder = MediaStreamRecorder;
	    }

	    // video recorder (in WebM format)
	    if (config.type === 'video' && (isChrome || isOpera)) {
	        recorder = WhammyRecorder;
	    }

	    // video recorder (in Gif format)
	    if (config.type === 'gif') {
	        recorder = GifRecorder;
	    }

	    // html2canvas recording!
	    if (config.type === 'canvas') {
	        recorder = CanvasRecorder;
	    }

	    // todo: enable below block when MediaRecorder in Chrome gets out of flags; and it also supports audio recording.
	    if (isMediaRecorderCompatible() && isChrome && recorder !== CanvasRecorder && recorder !== GifRecorder && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
	        if (mediaStream.getVideoTracks().length) {
	            recorder = MediaStreamRecorder;
	        }
	    }

	    if (config.recorderType) {
	        recorder = config.recorderType;
	    }

	    if (!config.disableLogs && isChrome && recorder === MediaStreamRecorder) {
	        console.debug('Using MediaRecorder API in chrome!');
	    }

	    return recorder;
	}