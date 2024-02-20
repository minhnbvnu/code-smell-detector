function ber_simple(n) {
	if (Array.isArray(n.value)) return n.value.map(x => ber_simple(x));
	return n.value;
}