function sc_every(proc, l) {
    var revres = null;
    var tmp = true;
    while (l !== null) {
        tmp = proc(l.car);
        if (tmp === false) return false;
	l = l.cdr;
    }
    return tmp;
}