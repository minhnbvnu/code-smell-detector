function SinkError(code) {
	if (!SinkError.hasOwnProperty(code)) throw SinkError(1);
	if (!(this instanceof SinkError)) return new SinkError(code);

	var k;
	for (k in SinkError[code]) {
		if (SinkError[code].hasOwnProperty(k)) {
			this[k] = SinkError[code][k];
		}
	}

	this.code = code;
}