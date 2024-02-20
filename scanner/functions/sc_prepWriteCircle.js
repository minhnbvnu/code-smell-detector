function sc_prepWriteCircle(o, symb, nbPointer) {
    // TODO sc_Struct
    if (o instanceof sc_Pair ||
	o instanceof sc_Vector) {
	if (o[symb] !== undefined) {
	    // not the first visit.
	    o[symb]++;
	    // unless there is already a number, assign one.
	    if (!o[symb + "nb"]) o[symb + "nb"] = nbPointer.nb++;
	    return;
	}
	o[symb] = 0;
	if (o instanceof sc_Pair) {
	    sc_prepWriteCircle(o.car, symb, nbPointer);
	    sc_prepWriteCircle(o.cdr, symb, nbPointer);
	} else {
	    for (var i = 0; i < o.length; i++)
		sc_prepWriteCircle(o[i], symb, nbPointer);
	}
    }
}