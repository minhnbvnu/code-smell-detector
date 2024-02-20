function sc_minus(x) {
    if (arguments.length === 1)
	return -x;
    else {
	var res = x;
	for (var i = 1; i < arguments.length; i++)
	    res -= arguments[i];
	return res;
    }
}