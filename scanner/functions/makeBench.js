function makeBench(runtime) {
	var fn;
	var str = "(function() {" + //
		require('streamline').transform("fn=" + bench.toString(), {
			runtime: runtime,
		}).code + //
		"return bench; })()";
	/* eslint-disable no-eval */
	eval(str);
	//console.log(mode + ": " + fn);
	return function(n, loop, modulo, asyncFn, cb) {
		fn(runtime, n, loop, modulo, asyncFn, cb);
	};
}