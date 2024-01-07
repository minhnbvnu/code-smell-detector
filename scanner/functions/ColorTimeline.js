function ColorTimeline(frameCount) {
	      var _this = _super.call(this, frameCount) || this;
	      _this.frames = spine.Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
	      return _this;
	    }