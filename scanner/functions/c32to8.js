function c32to8(data)
{
	var len = data.length;
	var ret = new Uint8Array(len * 4);
	var offs = 0;

	for(i = 0; i < len; i++)
	{
		ret[offs++] = data[i] & 0xFF;
		ret[offs++] = (data[i] >>> 8) & 0xFF;
		ret[offs++] = (data[i] >>> 16) & 0xFF;
		ret[offs++] = data[i] >>> 24;
	}

	return ret;
}