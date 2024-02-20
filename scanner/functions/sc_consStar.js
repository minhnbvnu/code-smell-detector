function sc_consStar() {
    var res = arguments[arguments.length - 1];
    for (var i = arguments.length-2; i >= 0; i--)
	res = new sc_Pair(arguments[i], res);
    return res;
}