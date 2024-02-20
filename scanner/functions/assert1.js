function assert1(cond) {
	if (!cond) {
		throw new Error('assertion failed');
	}
}