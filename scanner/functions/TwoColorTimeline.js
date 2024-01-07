function TwoColorTimeline(frameCount) {
	      var _this = _super.call(this, frameCount) || this;
	      _this.frames = spine.Utils.newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
	      return _this;
	    }