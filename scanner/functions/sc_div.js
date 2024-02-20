function sc_div(x) {
    if (arguments.length === 1)
	return 1/x;
    else {
	var res = x;
	for (var i = 1; i < arguments.length; i++)
	    res /= arguments[i];
	return res;
    }
}