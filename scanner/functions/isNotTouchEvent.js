function isNotTouchEvent(e) {
	  return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
	}