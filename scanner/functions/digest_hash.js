function digest_hash(hash) {
	try {
		const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
		_assertClass(hash, DenoHash);
		wasm.digest_hash(retptr, hash.ptr);
		var r0 = getInt32Memory0()[retptr / 4 + 0];
		var r1 = getInt32Memory0()[retptr / 4 + 1];
		var v0 = getArrayU8FromWasm0(r0, r1).slice();
		wasm.__wbindgen_free(r0, r1 * 1);
		return v0;
	} finally {
		wasm.__wbindgen_add_to_stack_pointer(16);
	}
}