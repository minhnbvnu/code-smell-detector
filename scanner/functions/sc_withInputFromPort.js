function sc_withInputFromPort(p, thunk) {
    try {
	var tmp = SC_DEFAULT_IN; // THREAD: shared var.
	SC_DEFAULT_IN = p;
	return thunk();
    } finally {
	SC_DEFAULT_IN = tmp;
    }
}