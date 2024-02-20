function Sigma1256(x) {
		return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
	}