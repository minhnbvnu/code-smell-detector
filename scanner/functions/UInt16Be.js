function UInt16Be(value, opt) {
	SingleType.call(this, value, 2, Buffer.prototype.readUInt16BE, Buffer.prototype.writeUInt16BE, opt);
}