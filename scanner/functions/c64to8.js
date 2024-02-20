function c64to8(data)
{
	var len = data.length;
	var ret = new Uint8Array(len * 8);
	var offs = 0;

	for(i = 0; i < len; i++)
	{
		ret[offs++] = data[i][0] & 0xFF;
		ret[offs++] = (data[i][0] >>> 8) & 0xFF;
		ret[offs++] = (data[i][0] >>> 16) & 0xFF;
		ret[offs++] = (data[i][0] >>> 24) & 0xFF;
		ret[offs++] = data[i][1] & 0xFF;
		ret[offs++] = (data[i][1] >>> 8) & 0xFF;
		ret[offs++] = (data[i][1] >>> 16) & 0xFF;
		ret[offs++] = (data[i][1] >>> 24) & 0xFF;
	}

	return ret;
}