function Player(src, microm) {
	    _classCallCheck(this, Player);

	    var audio = document.createElement('audio');

	    audio.src = src;

	    this.microm = microm;
	    this.isLoaded = false;
	    this.isPlaying = false;
	    this.isStoped = true;
	    this.duration = 0;
	    this.currentTime = 0;
	    this.audio = audio;
	    this.addEvents();
	  }