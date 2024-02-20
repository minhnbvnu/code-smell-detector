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