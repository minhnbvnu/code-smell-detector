function add64(buf, offs, data)
{
	buf[offs++] = data[0] & 0xFF;
	buf[offs++] = (data[0] >>> 8) & 0xFF;
	buf[offs++] = (data[0] >>> 16) & 0xFF;
	buf[offs++] = (data[0] >>> 24) & 0xFF;
	buf[offs++] = data[1] & 0xFF;
	buf[offs++] = (data[1] >>> 8) & 0xFF;
	buf[offs++] = (data[1] >>> 16) & 0xFF;
	buf[offs++] = (data[1] >>> 24) & 0xFF;
}