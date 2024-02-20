function llvm_writeDouble(addr,src)
  {
  //assert((llvm_double_addr&7)==0);
	heapDouble[llvm_double_addr>>3] = src;

	//assert((addr&7)==0);

	var val0 = heap32[(llvm_double_addr)>>2];
	var val1 = heap32[(llvm_double_addr+4)>>2];

	heap32[(addr)>>2] = val0;
	heap32[(addr+4)>>2] = val1;
  }