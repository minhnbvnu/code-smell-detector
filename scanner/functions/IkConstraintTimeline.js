function IkConstraintTimeline(frameCount) {
	      var _this = _super.call(this, frameCount) || this;
	      _this.frames = spine.Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
	      return _this;
	    }