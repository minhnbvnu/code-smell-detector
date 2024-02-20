function removeOneEvent(el, type, fn) {
		el.removeEventListener(type, fn, false);
	}