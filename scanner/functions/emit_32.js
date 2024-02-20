function emit_32(data)
{
	heapU32[g_addr_emit>>2] = data;
	g_addr_emit+=4;
}