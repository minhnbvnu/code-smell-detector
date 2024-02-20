function get_key_size(n) {
	const size_list = [64n, 128n, 256n, 512n, 1024n];
	for (const size of size_list) {
		if (n < 1n << (size * 8n)) return Number(size);
	}
	return 2048;
}