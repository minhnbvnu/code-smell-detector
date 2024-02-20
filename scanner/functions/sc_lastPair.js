function sc_lastPair(l) {
    if (!sc_isPair(l)) sc_error("sc_lastPair: pair expected");
    var res = l;
    var cdr = l.cdr;
    while (sc_isPair(cdr)) {
	res = cdr;
	cdr = res.cdr;
    }
    return res;
}