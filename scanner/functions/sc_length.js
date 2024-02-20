function sc_length(l) {
    var res = 0;
    while (l !== null) {
	res++;
	l = l.cdr;
    }
    return res;
}