function flavor(name, value) {
	if (arguments.length > 1) flavor[name] = value;
	else if (arguments.length == 1) return flavor[name];
	else return flavor;
}