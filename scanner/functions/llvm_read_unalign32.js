function llvm_read_unalign32(addr)
  {
	var value;
	value = heapU8[addr];
	value |= heapU8[addr+1]<<8;
	value |= heapU8[addr+2]<<16;
	value |= heapU8[addr+3]<<24;
	return value;
  }