function sc_listTail(l, k) {
    var res = l;
    for (var i = 0; i < k; i++) {
	res = res.cdr;
    }
    return res;
}