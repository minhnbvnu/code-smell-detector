function sc_symbolAppend() {
    var res = sc_SYMBOL_PREFIX;
    for (var i = 0; i < arguments.length; i++)
	res += arguments[i].slice(1);
    return res;
}