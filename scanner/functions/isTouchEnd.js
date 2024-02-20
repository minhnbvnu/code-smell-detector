function isTouchEnd(ev) {
		return (ev.type === 'touchend' || ev.type === 'mouseup' || ev.type === 'touchcancel');
	}