function digest_hash1(hash) {
	try {
		const retptr = wasm1.__wbindgen_add_to_stack_pointer(-16);
		_assertClass1(hash, DenoHash1);
		wasm1.digest_hash(retptr, hash.ptr);
		var r0 = getInt32Memory01()[retptr / 4 + 0];
		var r1 = getInt32Memory01()[retptr / 4 + 1];
		var v0 = getArrayU8FromWasm01(r0, r1).slice();
		wasm1.__wbindgen_free(r0, r1 * 1);
		return v0;
	} finally {
		wasm1.__wbindgen_add_to_stack_pointer(16);
	}
}