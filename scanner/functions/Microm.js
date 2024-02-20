function Microm() {
	    _classCallCheck(this, Microm);

	    this.isRecording = false;
	    this.recordRTC = null;
	    this.player = null;
	    this.mp3 = null;
	    this.eventListeners = {};
	    this.converter = new Converter();
	  }