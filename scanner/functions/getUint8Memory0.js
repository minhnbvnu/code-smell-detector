function getUint8Memory0() {
	if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
		cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
	}
	return cachegetUint8Memory0;
}