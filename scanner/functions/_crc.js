function _crc(data, len)
{
	var crc = 0;

	for(j = 0; j < len; j++)
	{
		var v = 0x80;
		for(i = 0; i < 8; i++)
		{
			var xorf = crc & 0x8000;
			crc = (crc << 1) & 0xFFFF

			if(data[j] & v)
				crc = (crc + 1) & 0xFFFF;
			if(xorf)
				crc ^= 0x1021;
			v >>= 1;
		}
	}
	return crc;
}