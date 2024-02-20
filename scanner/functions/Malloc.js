function Malloc(bytes)
{
	if ( heap == undefined )
	{
		//initHeap();
	}
	var newOffset = heapNewPos;
	// Always 32 bit aligned
	heapNewPos += ((bytes + 3) & 0xfffffffc);

	if (heapNewPos>mandreel_total_memory)
	{
		assert(false);
	}

	return newOffset;
}