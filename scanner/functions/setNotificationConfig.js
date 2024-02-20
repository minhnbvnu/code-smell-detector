function setNotificationConfig(options) {
	    var duration = options.duration,
	        placement = options.placement,
	        bottom = options.bottom,
	        top = options.top,
	        getContainer = options.getContainer;

	    if (duration !== undefined) {
	        defaultDuration = duration;
	    }
	    if (placement !== undefined) {
	        defaultPlacement = placement;
	    }
	    if (bottom !== undefined) {
	        defaultBottom = bottom;
	    }
	    if (top !== undefined) {
	        defaultTop = top;
	    }
	    if (getContainer !== undefined) {
	        defaultGetContainer = getContainer;
	    }
	}