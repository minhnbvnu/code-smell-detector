function shorten(str, length) {
	return str && str.length > length ? str.substr(0, length-1) + "…" : str;
}