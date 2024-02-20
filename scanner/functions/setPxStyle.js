function setPxStyle(el, value, vertical) {
	  value = vertical ? '0px, ' + value + 'px, 0px' : value + 'px, 0px, 0px';
	  setTransform(el.style, 'translate3d(' + value + ')');
	}