function UInt16Le(value, opt) {
	SingleType.call(this, value, 2, Buffer.prototype.readUInt16LE, Buffer.prototype.writeUInt16LE, opt);
}