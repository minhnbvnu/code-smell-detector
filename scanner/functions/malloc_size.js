function malloc_size(sp)
  {
  var ptr = heapU32[sp>>2];

	sp-=4;

	heap32[(sp)>>2] = ptr;
	tlsf_block_size(sp);
  }