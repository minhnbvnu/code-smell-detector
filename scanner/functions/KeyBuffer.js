function KeyBuffer() {
	this.buffer = '';

	return (key) => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = undefined;
		}

		this.timeout = setTimeout(() => {
			this.buffer = '';
		}, 400);

		this.buffer = this.buffer + key;
		return this.buffer;
	};
}