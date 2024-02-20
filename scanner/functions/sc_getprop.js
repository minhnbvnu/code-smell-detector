function sc_getprop(sym, key) {
    var ht = sc_properties[sym];
    if (ht) {
	if (key in ht)
	    return ht[key];
	else
	    return false;
    } else
	return false;
}