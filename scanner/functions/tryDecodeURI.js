function tryDecodeURI(encoded) {
	let linkDecoded = encoded;
	try {
		linkDecoded = decodeURI(linkDecoded);
	}
	catch (e) {
		verror(1, `Error decoding text: ${encoded}`);
	}
	return linkDecoded
}