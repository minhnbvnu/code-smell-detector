function MicrophoneIterator(microphoneConfig) {
	    var _this;

	    _this = _LazyIterator.call(this) || this;
	    _this.microphoneConfig = microphoneConfig;
	    _this.isClosed = false;
	    _this.fftSize = microphoneConfig.fftSize || 1024;
	    var fftSizeLog2 = Math.log2(_this.fftSize);

	    if (_this.fftSize < 0 || fftSizeLog2 < 4 || fftSizeLog2 > 14 || !Number.isInteger(fftSizeLog2)) {
	      throw new Error("Invalid fftSize: it must be a power of 2 between " + ("2 to 4 and 2 to 14, but got " + _this.fftSize));
	    }

	    _this.numFrames = microphoneConfig.numFramesPerSpectrogram || 43;
	    _this.sampleRateHz = microphoneConfig.sampleRateHz;
	    _this.columnTruncateLength = microphoneConfig.columnTruncateLength || _this.fftSize;
	    _this.audioTrackConstraints = microphoneConfig.audioTrackConstraints;
	    _this.smoothingTimeConstant = microphoneConfig.smoothingTimeConstant || 0;
	    _this.includeSpectrogram = microphoneConfig.includeSpectrogram === false ? false : true;
	    _this.includeWaveform = microphoneConfig.includeWaveform === true ? true : false;

	    if (!_this.includeSpectrogram && !_this.includeWaveform) {
	      throw new Error('Both includeSpectrogram and includeWaveform are false. ' + 'At least one type of data should be returned.');
	    }

	    return _this;
	  }