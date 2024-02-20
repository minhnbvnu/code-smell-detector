function sc_isKeyword(s) {
    return (typeof s === "string") &&
	(s.charAt(0) === sc_KEYWORD_PREFIX);
}