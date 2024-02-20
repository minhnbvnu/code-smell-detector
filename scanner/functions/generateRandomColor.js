function generateRandomColor() {
	var c = (Math.floor(Math.random() * 255)) * 256 * 256 +
			(Math.floor(Math.random() * 255)) * 256 +
			(Math.floor(Math.random() * 255));
	c = c.toString(16);
	while (c.length < 6) {
		c = '0' + c;
	}
	return '#' + c;
}