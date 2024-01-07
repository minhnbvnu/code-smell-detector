function PathConstraintPositionTimeline(frameCount) {
	      var _this = _super.call(this, frameCount) || this;
	      _this.frames = spine.Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
	      return _this;
	    }