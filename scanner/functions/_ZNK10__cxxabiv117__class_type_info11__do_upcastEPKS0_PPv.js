function _ZNK10__cxxabiv117__class_type_info11__do_upcastEPKS0_PPv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var r6;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = sp + -16;
	r1 = r0 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r1+1)] = 0;
	r2 = heap32[(fp)];
	heap32[(r1+2)] = 16;
	r3 = r2 >> 2;
	heap32[(r1+3)] = 0;
	r4 = heap32[(fp+2)];
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r4 = r4 >> 2;
	r3 = heap32[(r3+5)];
	r5 = heap32[(r4)];
	r6 = heap32[(fp+1)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r0 = heap32[(r1+1)];
	r0 = r0 & 6;
	if(r0 !=6) //_LBB824_2
{
	r0 = 0;
	r_g0 = r0;
	return;
}
else{
	r0 = heap32[(fp+-4)];
	heap32[(r4)] = r0;
	r0 = 1;
	r_g0 = r0;
	return;
}
}