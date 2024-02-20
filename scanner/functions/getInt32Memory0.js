function getInt32Memory0() {
	if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
		cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
	}
	return cachegetInt32Memory0;
}