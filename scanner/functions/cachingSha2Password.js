function cachingSha2Password(password, seed) {
	const stage1 = hash('sha256', encode2(password));
	const stage2 = hash('sha256', stage1);
	const stage3 = hash('sha256', Uint8Array.from([...stage2, ...seed]));
	return xor(stage1, stage3);
}