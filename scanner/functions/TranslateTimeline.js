function TranslateTimeline(frameCount) {
	      var _this = _super.call(this, frameCount) || this;
	      _this.frames = spine.Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
	      return _this;
	    }