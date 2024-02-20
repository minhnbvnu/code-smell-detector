function crcMiiBuf(b, authorid)
{
	var ret = new Uint8Array(b.length + 4);
	ret.set(b);

	var crc1 = _crc(ret, b.length + 2);
	ret[b.length] = crc1 >> 8;
	ret[b.length+1] = crc1 & 0xFF;

	var temp = new Uint8Array(authorid.length + ret.length);
	temp.set(authorid);
	temp.set(ret, authorid.length);

	var crc2 = _crc(temp, temp.length);
	ret[b.length+2] = crc2 >> 8;
	ret[b.length+3] = crc2 & 0xFF;

	return ret;
}