function parseAttributes(str) {
	const attrs = {};
	for (const entry of str.split(',')) {
		const pos = entry.indexOf('=');
		if (pos < 1) {
			throw new Error(Reason.BadMessage);
		}
		const key = entry.substr(0, pos);
		const value = entry.substr(pos + 1);
		attrs[key] = value;
	}
	return attrs;
}