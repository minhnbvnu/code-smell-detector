function elementToBuf(e) {
	return (Buffer.from(e.split(' ')[1], 'base64'));
}