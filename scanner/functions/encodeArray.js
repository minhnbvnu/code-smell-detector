function encodeArray(array) {
	let encodedArray = '{';
	array.forEach((element, index) => {
		if (index > 0) {
			encodedArray += ',';
		}
		if (element === null || typeof element === 'undefined') {
			encodedArray += 'NULL';
		} else if (Array.isArray(element)) {
			encodedArray += encodeArray(element);
		} else if (element instanceof Uint8Array) {
			throw new Error("Can't encode array of buffers.");
		} else {
			const encodedElement = encode2(element);
			encodedArray += escapeArrayElement(encodedElement);
		}
	});
	encodedArray += '}';
	return encodedArray;
}