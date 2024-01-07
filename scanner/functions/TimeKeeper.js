function TimeKeeper() {
	      this.maxDelta = 0.064;
	      this.framesPerSecond = 0;
	      this.delta = 0;
	      this.totalTime = 0;
	      this.lastTime = Date.now() / 1000;
	      this.frameCount = 0;
	      this.frameTime = 0;
	    }