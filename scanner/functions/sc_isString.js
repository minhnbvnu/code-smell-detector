function sc_isString(s) {
    return (typeof s === "string") &&
	(s.charAt(0) !== sc_SYMBOL_PREFIX);
}