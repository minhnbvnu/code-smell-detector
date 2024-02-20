function setAttr(el, attrs) {
		for (var a in attrs) {
			el.setAttribute(a, attrs[a]);
		}
	}