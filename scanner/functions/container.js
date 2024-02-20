function container (value, owner) {
	return value.ownerDocument === undefined ? owner === undefined ? value : frame : value.documentElement || value
}