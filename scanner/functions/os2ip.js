function os2ip(m) {
	let n = 0n;
	for (const c of m) n = (n << 8n) + BigInt(c);
	return n;
}