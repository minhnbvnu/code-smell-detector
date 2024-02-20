function _ZNK10__cxxabiv117__class_type_info11__do_upcastEPKS0_PKvRNS0_15__upcast_resultE(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r0 = heap32[(r0+1)];
	r1 = heap32[(r1+1)];
	r2 = _2E_str26;
	r0 = r0 == 0 ? r2 : r0;
	r1 = r1 == 0 ? r2 : r1;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r2 = r_g0;
if(!(r2 <0)) //_LBB830_3
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	strcmp(i7);
	r0 = r_g0;
if(!(r0 <0)) //_LBB830_3
{
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+3)];
	r1 = r1 >> 2;
	heap32[(r1)] = r0;
	heap32[(r1+3)] = 8;
	heap32[(r1+1)] = 6;
	r0 = 1;
	r_g0 = r0;
	return;
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}