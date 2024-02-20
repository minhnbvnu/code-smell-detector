function sc_pregexpMatch(re, s) {
    var reg = (re instanceof RegExp) ? re : sc_pregexp(re);
    var tmp = reg.exec(sc_string2jsstring(s));
    
    if (tmp == null) return false;
    
    var res = null;
    for (var i = tmp.length-1; i >= 0; i--) {
	if (tmp[i] !== null) {
	    res = sc_cons(sc_jsstring2string(tmp[i]), res);
	} else {
	    res = sc_cons(false, res);
	}
    }
    return res;
}