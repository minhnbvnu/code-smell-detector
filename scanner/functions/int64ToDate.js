function int64ToDate(buf) {
	var i = buf.readUInt32BE(0) * 4294967296;
	i += buf.readUInt32BE(4);
	var d = new Date();
	d.setTime(i * 1000);
	d.sourceInt64 = buf;
	return (d);
}