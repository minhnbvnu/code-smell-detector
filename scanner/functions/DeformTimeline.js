function DeformTimeline(frameCount) {
	      var _this = _super.call(this, frameCount) || this;
	      _this.frames = spine.Utils.newFloatArray(frameCount);
	      _this.frameVertices = new Array(frameCount);
	      if (zeros == null) zeros = spine.Utils.newFloatArray(64);
	      return _this;
	    }