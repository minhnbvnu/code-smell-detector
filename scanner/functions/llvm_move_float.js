function llvm_move_float(addr_dst, addr_src)
  {
	heapU32[(addr_dst)] = heapU32[(addr_src)];
  }