function isAllowPress() {
	    // avoid click penetration
	    return Date.now() - lastClickTime >= pressDelay;
	}