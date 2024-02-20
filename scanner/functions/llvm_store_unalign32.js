function llvm_store_unalign32(addr, value)
  {
	heap8[addr] = value&0xff;
	heap8[addr+1] = (value>>>8)&0xff;
	heap8[addr+2] = (value>>>16)&0xff;
	heap8[addr+3] = (value>>>24)&0xff;
  }