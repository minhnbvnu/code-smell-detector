function writeBitField(setBits, bitIndex) {
	var bitLen = bitIndex.length;
	var blen = Math.ceil(bitLen / 8);
	var unused = blen * 8 - bitLen;
	var bits = Buffer.alloc(1 + blen); // zero-filled
	bits[0] = unused;
	for (var i = 0; i < bitLen; ++i) {
		var byteN = 1 + Math.floor(i / 8);
		var bit = 7 - (i % 8);
		var mask = 1 << bit;
		var name = bitIndex[i];
		if (name === undefined)
			continue;
		var bitVal = (setBits.indexOf(name) !== -1);
		if (bitVal) {
			bits[byteN] |= mask;
		}
	}
	return (bits);
}