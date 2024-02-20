function getUint8Memory01() {
	if (cachegetUint8Memory01 === null || cachegetUint8Memory01.buffer !== wasm1.memory.buffer) {
		cachegetUint8Memory01 = new Uint8Array(wasm1.memory.buffer);
	}
	return cachegetUint8Memory01;
}