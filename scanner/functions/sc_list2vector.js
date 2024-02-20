function sc_list2vector(l) {
    var a = new sc_Vector();
    while(l !== null) {
	a.push(l.car);
	l = l.cdr;
    }
    return a;
}