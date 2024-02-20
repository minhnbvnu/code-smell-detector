function assert_unalign()
{
	dump("fatal error: unaligned memory access detected!!!!");
	assert(false);
}