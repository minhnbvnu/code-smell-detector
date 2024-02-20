function MandreelInterWriteInt(ptr, value)
{
	heap32[ptr>>2] = value;
}