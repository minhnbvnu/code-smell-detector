function sc_forEach(proc, l1) {
    if (l1 === undefined)
	return undefined;
    // else
    var nbApplyArgs = arguments.length - 1;
    var applyArgs = new Array(nbApplyArgs);
    while (l1 !== null) {
	for (var i = 0; i < nbApplyArgs; i++) {
	    applyArgs[i] = arguments[i + 1].car;
	    arguments[i + 1] = arguments[i + 1].cdr;
	}
	proc.apply(null, applyArgs);
    }
    // add return so FF does not complain.
    return undefined;
}