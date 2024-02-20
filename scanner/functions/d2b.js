function d2b (d) {
	var buf = new ArrayBuffer(8);
	var f64_buf = new Float64Array(buf);
	f64_buf[0] = d;
	return Array.from(new Int8Array(buf));
}