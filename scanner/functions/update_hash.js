function update_hash(hash, data) {
	_assertClass(hash, DenoHash);
	var ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
	var len0 = WASM_VECTOR_LEN;
	wasm.update_hash(hash.ptr, ptr0, len0);
}