function sc_display(o, p) {
    if (p === undefined) // we assume not given
	p = SC_DEFAULT_OUT;
    p.appendJSString(sc_toDisplayString(o));
}