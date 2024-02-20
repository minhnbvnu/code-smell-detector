function rawBench(n, loop, modulo, asyncFn, callback) {
	var count = 0;
	var l = loop;

	function fibo(nn, cb) {
		if (modulo && count++ % modulo === 0) asyncFn(function(err) {
			if (err) return cb(err);
			fibo1(nn, cb);
		});
		else fibo1(nn, cb);

	}

	function fibo1(nn, cb) {
		if (nn <= 1) return cb(null, 1);
		fibo(nn - 1, function(err, v1) {
			if (err) return cb(err);
			fibo(nn - 2, function(err, v2) {
				if (err) return cb(err);
				cb(null, v1 + v2);
			});
		});
	}

	var expected = fib(n);
	var t0 = Date.now();
	var loopCb = function(err, got) {
			if (err) return callback(err);
			if (got !== expected) throw new Error("bench failed: got " + got + ', expected ' + expected);
			if (--l > 0) {
				fibo(n, loopCb);
			} else {
				console.log('raw callbacks:\t' + (Date.now() - t0) + "ms");
				callback(null, count);
			}
		};
	fibo(n, loopCb);
}