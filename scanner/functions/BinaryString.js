function BinaryString(value, opt) {
	Type.call(this, opt);
	this.value = value || new Buffer("");
}