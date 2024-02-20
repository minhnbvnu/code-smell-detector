function Recording (bindTo) {
	this.boundTo = bindTo;
	this.buffers = [];
	bindTo.activeRecordings.push(this);
}