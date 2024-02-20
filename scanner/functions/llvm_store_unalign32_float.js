function llvm_store_unalign32_float(addr, value)
  {
	heapFloat[0] = value;
	var data = heap32[0];
	heap8[addr] = data&0xff;
	heap8[addr+1] = (data>>>8)&0xff;
	heap8[addr+2] = (data>>>16)&0xff;
	heap8[addr+3] = (data>>>24)&0xff;
  }