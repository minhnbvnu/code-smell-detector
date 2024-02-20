function sc_any(proc, l) {
    var revres = null;
    while (l !== null) {
        var tmp = proc(l.car);
        if(tmp !== false) return tmp;
	l = l.cdr;
    }
    return false;
}