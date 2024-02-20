function passArray8ToWasm01(arg, malloc) {
	const ptr = malloc(arg.length * 1);
	getUint8Memory01().set(arg, ptr / 1);
	WASM_VECTOR_LEN1 = arg.length;
	return ptr;
}