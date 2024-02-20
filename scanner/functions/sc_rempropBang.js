function sc_rempropBang(sym, key) {
    var ht = sc_properties[sym];
    if (ht)
	delete ht[key];
}