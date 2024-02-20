function sc_assoc(o, al) {
    while (al !== null) {
	if (sc_isEqual(al.car.car, o))
	    return al.car;
	al = al.cdr;
    }
    return false;
}