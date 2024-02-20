function UInt32Be(value, opt) {
	SingleType.call(this, value, 4, Buffer.prototype.readUInt32BE, Buffer.prototype.writeUInt32BE, opt);
}