function sc_remq(o, l) {
    var dummy = { cdr : null };
    var tail = dummy;
    while (l !== null) {
	if (l.car !== o) {
	    tail.cdr = sc_cons(l.car, null);
	    tail = tail.cdr;
	}
	l = l.cdr;
    }
    return dummy.cdr;
}