	    this.startRecording = function() {
	        var mediaType = this.mediaType;
	        var recorderType;

	        if (typeof mediaType.audio !== 'function' && isMediaRecorderCompatible() && mediaStream && mediaStream.getAudioTracks && mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
	            // Firefox is supporting both audio/video in single blob
	            this.mediaType.audio = false;
	        }

	        if (!!mediaType.audio) {
	            if (typeof mediaType.audio === 'function') {
	                recorderType = mediaType.audio;
	            }
	            this.audioRecorder = new RecordRTC(mediaStream, {
	                type: 'audio',
	                bufferSize: this.bufferSize,
	                sampleRate: this.sampleRate,
	                numberOfAudioChannels: this.numberOfAudioChannels || 2,
	                disableLogs: this.disableLogs,
	                recorderType: recorderType
	            });
	            if (!mediaType.video) {
	                this.audioRecorder.startRecording();
	            }
	        }

	        if (!!mediaType.video) {
	            if (typeof mediaType.video === 'function') {
	                recorderType = mediaType.video;
	            }
	            this.videoRecorder = new RecordRTC(mediaStream, {
	                type: 'video',
	                video: this.video,
	                canvas: this.canvas,
	                frameInterval: this.frameInterval || 10,
	                disableLogs: this.disableLogs,
	                recorderType: recorderType
	            });
	            if (!mediaType.audio) {
	                this.videoRecorder.startRecording();
	            }
	        }

	        if (!!mediaType.audio && !!mediaType.video) {
	            var self = this;
	            self.videoRecorder.initRecorder(function() {
	                self.audioRecorder.initRecorder(function() {
	                    // Both recorders are ready to record things accurately
	                    self.videoRecorder.startRecording();
	                    self.audioRecorder.startRecording();
	                });
	            });
	        }

	        if (!!mediaType.gif) {
	            if (typeof mediaType.gif === 'function') {
	                recorderType = mediaType.gif;
	            }
	            this.gifRecorder = new RecordRTC(mediaStream, {
	                type: 'gif',
	                frameRate: this.frameRate || 200,
	                quality: this.quality || 10,
	                disableLogs: this.disableLogs,
	                recorderType: recorderType
	            });
	            this.gifRecorder.startRecording();
	        }
	    };