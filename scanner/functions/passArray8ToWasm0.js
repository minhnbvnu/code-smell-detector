function passArray8ToWasm0(arg, malloc) {
	const ptr = malloc(arg.length * 1);
	getUint8Memory0().set(arg, ptr / 1);
	WASM_VECTOR_LEN = arg.length;
	return ptr;
}