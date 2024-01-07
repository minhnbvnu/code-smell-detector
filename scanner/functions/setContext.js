function setContext(context) {
	  this.shouldSkip = false;
	  this.shouldStop = false;
	  this.removed = false;
	  this.skipKeys = {};

	  if (context) {
	    this.context = context;
	    this.state = context.state;
	    this.opts = context.opts;
	  }

	  this.setScope();

	  return this;
	}