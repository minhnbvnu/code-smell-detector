function fibo(_, nn) {
		if (modulo && count++ % modulo === 0) asyncFn(_);
		if (nn <= 1) return 1;
		return fibo(_, nn - 1) + fibo(_, nn - 2);

	}