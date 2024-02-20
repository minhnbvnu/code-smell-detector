function sc_putpropBang(sym, key, val) {
    var ht = sc_properties[sym];
    if (!ht) {
	ht = new Object();
	sc_properties[sym] = ht;
    }
    ht[key] = val;
}