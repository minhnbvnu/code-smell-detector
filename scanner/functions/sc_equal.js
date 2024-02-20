function sc_equal(x) {
    for (var i = 1; i < arguments.length; i++)
	if (x !== arguments[i])
	    return false;
    return true;
}