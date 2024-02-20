function puts(sp)
{
	var addr = heapU32[sp>>2];

	var name = get_string_from_ptr(addr);

	name+='\n';

	dump(name);

}