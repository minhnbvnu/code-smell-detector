function sc_reverseAppendBang(l1, l2) {
    var res = l2;
    while (l1 !== null) {
	var tmp = res;
	res = l1;
	l1 = l1.cdr;
	res.cdr = tmp;
    }
    return res;
}