function WhammyVideo(speed, quality){ // a more abstract-ish API
		this.frames = [];
		this.duration = 1000 / speed;
		this.quality = quality || 0.8;
	}