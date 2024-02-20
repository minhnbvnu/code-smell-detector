function sc_makeVector(size, fill) {
    var a = new sc_Vector(size);
    if (fill !== undefined)
	sc_vectorFillBang(a, fill);
    return a;
}