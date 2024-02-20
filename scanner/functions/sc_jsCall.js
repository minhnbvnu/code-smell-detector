function sc_jsCall(o, fun) {
    var args = new Array();
    for (var i = 2; i < arguments.length; i++)
	args[i-2] = arguments[i];
    return fun.apply(o, args);
}