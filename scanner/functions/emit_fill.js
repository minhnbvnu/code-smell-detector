function emit_fill(data, size)
{
	var j;
	for (j=0;j<size;j++)
	{
		heapU8[g_addr_emit] = data;
		g_addr_emit++;
	}
}