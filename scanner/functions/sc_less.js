function sc_less(x) {
    for (var i = 1; i < arguments.length; i++) {
	if (x >= arguments[i])
	    return false;
	x = arguments[i];
    }
    return true;
}