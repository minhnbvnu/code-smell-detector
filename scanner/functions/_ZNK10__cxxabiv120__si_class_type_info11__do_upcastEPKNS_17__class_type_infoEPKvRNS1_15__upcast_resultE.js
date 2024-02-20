function _ZNK10__cxxabiv120__si_class_type_info11__do_upcastEPKNS_17__class_type_infoEPKvRNS1_15__upcast_resultE(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = r0 >> 2;
	r1 = r1 >> 2;
	r2 = heap32[(r2+1)];
	r3 = heap32[(r1+1)];
	r4 = _2E_str26;
	r2 = r2 == 0 ? r4 : r2;
	r3 = r3 == 0 ? r4 : r3;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	strcmp(i7);
	r6 = r_g0;
if(!(r6 <0)) //_LBB834_2
{
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	strcmp(i7);
	r2 = r_g0;
	if(r2 >-1) //_LBB834_3
{
	r0 = r5 >> 2;
	heap32[(r0)] = r4;
	heap32[(r0+3)] = 8;
	heap32[(r0+1)] = 6;
	r0 = 1;
	r_g0 = r0;
	return;
}
}
	r1 = heap32[(r1+2)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+5)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	return;
}