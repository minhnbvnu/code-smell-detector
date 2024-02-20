function sc_isSymbol(s) {
    return (typeof s === "string") &&
	(s.charAt(0) === sc_SYMBOL_PREFIX);
}