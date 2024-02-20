function sc_values() {
    if (arguments.length === 1)
	return arguments[0];
    else
	return new sc_Values(arguments);
}