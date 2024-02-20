function bench(prefix, n, loop, modulo, asyncFn, _) {
	var count = 0;

	function fibo(_, nn) {
		if (modulo && count++ % modulo === 0) asyncFn(_);
		if (nn <= 1) return 1;
		return fibo(_, nn - 1) + fibo(_, nn - 2);

	}
	var expected = fib(n);
	var t0 = Date.now();
	for (var i = 0; i < loop; i++) {
		var got = fibo(_, n);
		if (got !== expected) throw new Error("bench failed: got " + got + ', expected ' + expected);
	}
	var tabs = (prefix.length < 7) ? '\t\t' : '\t';
	console.log(prefix + ':' + tabs + (Date.now() - t0) + "ms");
	return count;
}