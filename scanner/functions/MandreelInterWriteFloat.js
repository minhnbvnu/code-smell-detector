function MandreelInterWriteFloat(ptr, value)
{
	heapFloat[ptr>>2] = value;
}