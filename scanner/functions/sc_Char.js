function sc_Char(c) {
    var cached = sc_Char.lazy[c];
    if (cached)
	return cached;
    this.val = c;
    sc_Char.lazy[c] = this;
    // add return, so FF does not complain.
    return undefined;
}