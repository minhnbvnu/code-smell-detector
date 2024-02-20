function fmtU32Array(arr) {
		return arr.map((u32) => "0x" + u32.toString(16)).join(", ");
	}