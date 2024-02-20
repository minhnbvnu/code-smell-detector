function sc_filterMap1(proc, l1) {
    var revres = null;
    while (l1 !== null) {
        var tmp = proc(l1.car)
        if (tmp !== false) revres = sc_cons(tmp, revres);
        l1 = l1.cdr;
    }
    return sc_reverseAppendBang(revres, null);
}