function sc_assq(o, al) {
    while (al !== null) {
	if (al.car.car === o)
	    return al.car;
	al = al.cdr;
    }
    return false;
}