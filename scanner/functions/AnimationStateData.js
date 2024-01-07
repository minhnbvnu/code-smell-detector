function AnimationStateData(skeletonData) {
	      this.animationToMixTime = {};
	      this.defaultMix = 0;
	      if (skeletonData == null) throw new Error("skeletonData cannot be null.");
	      this.skeletonData = skeletonData;
	    }