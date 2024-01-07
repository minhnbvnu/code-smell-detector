function RotateTimeline(frameCount) {
	      var _this = _super.call(this, frameCount) || this;
	      _this.frames = spine.Utils.newFloatArray(frameCount << 1);
	      return _this;
	    }