function writeAllSync(w, arr) {
	let nwritten = 0;
	while (nwritten < arr.length) {
		nwritten += w.writeSync(arr.subarray(nwritten));
	}
}