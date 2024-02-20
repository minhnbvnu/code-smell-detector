function sc_multi() {
    var product = 1;
    for (var i = 0; i < arguments.length; i++)
	product *= arguments[i];
    return product;
}