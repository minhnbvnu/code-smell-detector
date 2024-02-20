function power_mod(n, p, m) {
	if (p === 1n) return n;
	if (p % 2n === 0n) {
		const t = power_mod(n, p >> 1n, m);
		return (t * t) % m;
	} else {
		const t = power_mod(n, p >> 1n, m);
		return (t * t * n) % m;
	}
}