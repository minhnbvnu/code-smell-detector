function WriteHeapU64(addr, value)
  {
	heap32[addr>>2] = value.l;
	heap32[(addr>>2)+1] = value.h;
  }