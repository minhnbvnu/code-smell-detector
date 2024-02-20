function WriteHeapDouble(addr, value)
  {
  //assert((addr&7)==0);
	heapDouble[addr>>3] = value;
  }