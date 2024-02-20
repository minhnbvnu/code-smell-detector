function sc_makeList(nbEls, fill) {
    var res = null;
    for (var i = 0; i < nbEls; i++)
	res = new sc_Pair(fill, res);
    return res;
}