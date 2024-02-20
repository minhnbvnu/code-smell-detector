function _ZNK10__cxxabiv120__si_class_type_info20__do_find_public_srcEiPKvPKNS_17__class_type_infoES2_(sp)
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
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+4)];
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+3)];
if(!(r0 !=r1)) //_LBB836_3
{
	r4 = r3 >> 2;
	r5 = r2 >> 2;
	r4 = heap32[(r4+1)];
	r5 = heap32[(r5+1)];
	r6 = _2E_str26;
	r4 = r4 == 0 ? r6 : r4;
	r5 = r5 == 0 ? r6 : r5;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	strcmp(i7);
	r6 = r_g0;
if(!(r6 <0)) //_LBB836_3
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	strcmp(i7);
	r4 = r_g0;
	if(r4 >-1) //_LBB836_4
{
	r0 = 6;
	r_g0 = r0;
	return;
}
}
}
	r4 = heap32[(fp+1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+2)];
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+7)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	return;
}