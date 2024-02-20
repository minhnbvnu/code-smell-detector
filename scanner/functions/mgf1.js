function mgf1(seed, length, hash) {
	let counter = 0n;
	let output = [];
	while (output.length < length) {
		let h;
		const c = i2osp(counter, 4);
		if (typeof hash === 'function') {
			h = hash(new Uint8Array([...seed, ...c]));
		} else {
			h = new Uint8Array(
				createHash1(hash)
					.update(new Uint8Array([...seed, ...c]))
					.digest()
			);
		}
		output = [...output, ...h];
		counter++;
	}
	return new Uint8Array(output.slice(0, length));
}