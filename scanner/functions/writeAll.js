async function writeAll(w, arr) {
	let nwritten = 0;
	while (nwritten < arr.length) {
		nwritten += await w.write(arr.subarray(nwritten));
	}
}