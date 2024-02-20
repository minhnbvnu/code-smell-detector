function UInt32Le(value, opt) {
	SingleType.call(this, value, 4, Buffer.prototype.readUInt32LE, Buffer.prototype.writeUInt32LE, opt);
}