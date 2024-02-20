function dateToInt64(date) {
	if (date.sourceInt64 !== undefined)
		return (date.sourceInt64);
	var i = Math.round(date.getTime() / 1000);
	var upper = Math.floor(i / 4294967296);
	var lower = Math.floor(i % 4294967296);
	var buf = Buffer.alloc(8);
	buf.writeUInt32BE(upper, 0);
	buf.writeUInt32BE(lower, 4);
	return (buf);
}