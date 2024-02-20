function sc_member(o, l) {
    while (l !== null) {
	if (sc_isEqual(l.car,o))
	    return l;
	l = l.cdr;
    }
    return false;
}