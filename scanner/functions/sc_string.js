function sc_string() {
    for (var i = 0; i < arguments.length; i++)
	arguments[i] = arguments[i].val;
    return "".concat.apply("", arguments);
}