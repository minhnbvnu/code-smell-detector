function getTargetRect(target) {
	    return target !== window ? target.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
	}