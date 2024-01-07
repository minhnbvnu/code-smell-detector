function AnimationState(data) {
	      this.tracks = new Array();
	      this.timeScale = 1;
	      this.unkeyedState = 0;
	      this.events = new Array();
	      this.listeners = new Array();
	      this.queue = new EventQueue(this);
	      this.propertyIDs = new spine.IntSet();
	      this.animationsChanged = false;
	      this.trackEntryPool = new spine.Pool(function () {
	        return new TrackEntry();
	      });
	      this.data = data;
	    }