function getTouchPosition(vertical, e) {
	  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
	}