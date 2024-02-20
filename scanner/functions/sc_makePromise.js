function sc_makePromise(proc) {
    var isResultReady = false;
    var result = undefined;
    return function() {
	if (!isResultReady) {
	    var tmp = proc();
	    if (!isResultReady) {
		isResultReady = true;
		result = tmp;
	    }
	}
	return result;
    };
}