function emit_string(v)
{
	var j;
	var len = v.length;
	var data;

	for(j = 0; j < len; j++)
	{
		data = v.charCodeAt(j);

		heapU8[g_addr_emit] = data;
		g_addr_emit++;
	}
}