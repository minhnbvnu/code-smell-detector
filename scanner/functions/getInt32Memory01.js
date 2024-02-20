function getInt32Memory01() {
	if (cachegetInt32Memory01 === null || cachegetInt32Memory01.buffer !== wasm1.memory.buffer) {
		cachegetInt32Memory01 = new Int32Array(wasm1.memory.buffer);
	}
	return cachegetInt32Memory01;
}