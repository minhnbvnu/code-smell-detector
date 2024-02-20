function sc_deleteBang(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    var needsAssig = true;
    while (l !== null) {
	if (sc_isEqual(l.car, o)) {
	    needsAssig = true;
	} else {
	    if (needsAssig) {
		tail.cdr = l;
		needsAssig = false;
	    }
	    tail = l;
	}
	l = l.cdr;
    }
    tail.cdr = null;
    return dummy.cdr;
}