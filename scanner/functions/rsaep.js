function rsaep(n, e, m) {
	return power_mod(m, e, n);
}