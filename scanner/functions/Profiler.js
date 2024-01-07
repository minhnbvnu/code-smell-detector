function Profiler(backendTimer, logger) {
	    this.backendTimer = backendTimer;
	    this.logger = logger;

	    if (logger == null) {
	      this.logger = new Logger();
	    }
	  }