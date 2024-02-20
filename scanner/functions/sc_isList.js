function sc_isList(o) {
    var rabbit;
    var turtle;

    var rabbit = o;
    var turtle = o;
    while (true) {
	if (rabbit === null ||
	    (rabbit instanceof sc_Pair && rabbit.cdr === null))
	    return true;  // end of list
	else if ((rabbit instanceof sc_Pair) &&
		 (rabbit.cdr instanceof sc_Pair)) {
	    rabbit = rabbit.cdr.cdr;
	    turtle = turtle.cdr;
	    if (rabbit === turtle) return false; // cycle
	} else
	    return false; // not pair
    }
}