function trap(e) {
	if (!e) {
		e = event;
		e.which = e.keyCode;
	}
	try {
		modifierKey = e.ctrlKey || e.altKey || e.metaKey;
	}
	catch(e) {
		modifierKey = false;
	}
	return modifierKey || e.which == 0;
}