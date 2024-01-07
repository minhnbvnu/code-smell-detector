function CurveTimeline(frameCount) {
	      if (frameCount <= 0) throw new Error("frameCount must be > 0: " + frameCount);
	      this.curves = spine.Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
	    }