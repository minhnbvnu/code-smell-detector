function sc_apply(proc) {
    var args = new Array();
    // first part of arguments are not in list-form.
    for (var i = 1; i < arguments.length - 1; i++)
	args.push(arguments[i]);
    var l = arguments[arguments.length - 1];
    while (l !== null) {
	args.push(l.car);
	l = l.cdr;
    }
    return proc.apply(null, args);
}