function sc_vectorCopyBang(target, tstart, source, sstart, send) {
    if (!sstart) sstart = 0;
    if (!send) send = source.length;

    // if target == source we don't want to overwrite not yet copied elements.
    if (tstart <= sstart) {
	for (var i = tstart, j = sstart; j < send; i++, j++) {
	    target[i] = source[j];
	}
    } else {
	var diff = send - sstart;
	for (var i = tstart + diff - 1, j = send - 1;
	     j >= sstart;
	     i--, j--) {
	    target[i] = source[j];
	}
    }
    return target;
}