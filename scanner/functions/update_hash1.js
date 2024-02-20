function update_hash1(hash, data) {
	_assertClass1(hash, DenoHash1);
	var ptr0 = passArray8ToWasm01(data, wasm1.__wbindgen_malloc);
	var len0 = WASM_VECTOR_LEN1;
	wasm1.update_hash(hash.ptr, ptr0, len0);
}