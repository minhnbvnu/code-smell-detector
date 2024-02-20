function c8to32(data)
{
	var len = data.length / 4;
	var ret = new Uint32Array(len);
	var offs = 0;

	for(i = 0; i < len; i++)
	{
		ret[i] = data[offs++];
		ret[i] |= data[offs++] << 8;
		ret[i] |= data[offs++] << 16;
		ret[i] |= data[offs++] << 24;
	}

	return ret;
}