function sc_isVectorEqual(v1, v2, comp) {
    if (v1.length !== v2.length) return false;
    for (var i = 0; i < v1.length; i++)
	if (!comp(v1[i], v2[i])) return false;
    return true;
}