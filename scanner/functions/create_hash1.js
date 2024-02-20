function create_hash1(algorithm) {
	var ptr0 = passStringToWasm01(algorithm, wasm1.__wbindgen_malloc, wasm1.__wbindgen_realloc);
	var len0 = WASM_VECTOR_LEN1;
	var ret = wasm1.create_hash(ptr0, len0);
	return DenoHash1.__wrap(ret);
}