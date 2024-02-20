function sc_reverse(l1) {
    var res = null;
    while (l1 !== null) {
	res = sc_cons(l1.car, res);
	l1 = l1.cdr;
    }
    return res;
}