function numMBBeforeWarning() {
	  if (env().global.screen == null) {
	    return 1024; // 1 GB.
	  }

	  return env().global.screen.height * env().global.screen.width * window.devicePixelRatio * BEFORE_PAGING_CONSTANT / 1024 / 1024;
	}