function Animation(name, timelines, duration) {
	      if (name == null) throw new Error("name cannot be null.");
	      if (timelines == null) throw new Error("timelines cannot be null.");
	      this.name = name;
	      this.timelines = timelines;
	      this.timelineIds = [];
	      for (var i = 0; i < timelines.length; i++) this.timelineIds[timelines[i].getPropertyId()] = true;
	      this.duration = duration;
	    }