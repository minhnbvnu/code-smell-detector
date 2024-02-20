function UInt8(value, opt) {
	SingleType.call(this, value, 1, Buffer.prototype.readUInt8, Buffer.prototype.writeUInt8, opt);
}