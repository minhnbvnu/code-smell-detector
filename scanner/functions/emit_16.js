function emit_16(data)
{
	heapU16[g_addr_emit>>1] = data;
	g_addr_emit+=2;
}