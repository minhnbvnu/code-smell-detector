function sc_vector2list(a) {
    var res = null;
    for (var i = a.length-1; i >= 0; i--)
	res = sc_cons(a[i], res);
    return res;
}