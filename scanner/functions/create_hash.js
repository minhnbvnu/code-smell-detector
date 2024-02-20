function create_hash(algorithm) {
	var ptr0 = passStringToWasm0(algorithm, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
	var len0 = WASM_VECTOR_LEN;
	var ret = wasm.create_hash(ptr0, len0);
	return DenoHash.__wrap(ret);
}