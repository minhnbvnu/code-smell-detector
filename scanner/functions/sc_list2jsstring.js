function sc_list2jsstring(l) {
    var a = new Array();
    while(l !== null) {
	a.push(l.car.val);
	l = l.cdr;
    }
    return "".concat.apply("", a);
}