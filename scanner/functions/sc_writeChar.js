function sc_writeChar(c, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(c.val);
}