function sc_list() {
    var res = null;
    var a = arguments;
    for (var i = a.length-1; i >= 0; i--)
	res = new sc_Pair(a[i], res);
    return res;
}