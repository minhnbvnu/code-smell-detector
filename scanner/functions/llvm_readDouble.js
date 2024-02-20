function llvm_readDouble(addr)
  {
  	//assert((addr&7)==0);

	var val0 = heap32[(addr)>>2];
	var val1 = heap32[(addr+4)>>2];

	heap32[(llvm_double_addr)>>2] = val0;
	heap32[(llvm_double_addr+4)>>2] = val1;


//	assert((llvm_double_addr&7)==0);
	var result = heapDouble[llvm_double_addr>>3];


	return result;

  }