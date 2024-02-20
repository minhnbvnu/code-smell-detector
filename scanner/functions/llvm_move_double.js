function llvm_move_double(addr_dst, addr_src)
  {

	var val0 = heapU32[(addr_src)>>2];
	var val1 = heapU32[(addr_src+4)>>2];

	heapU32[(addr_dst)>>2] = val0;
	heapU32[(addr_dst+4)>>2] = val1;

  }