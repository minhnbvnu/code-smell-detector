function sc_newline(p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString("\n");
}