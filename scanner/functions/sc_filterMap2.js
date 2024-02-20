function sc_filterMap2(proc, l1, l2) {
    var revres = null;
    while (l1 !== null) {
        var tmp = proc(l1.car, l2.car);
        if(tmp !== false) revres = sc_cons(tmp, revres);
	l1 = l1.cdr;
	l2 = l2.cdr
    }
    return sc_reverseAppendBang(revres, null);
}