function _ZNK10__cxxabiv117__class_type_info12__do_dyncastEiNS0_10__sub_kindEPKS0_PKvS3_S5_RNS0_16__dyncast_resultE(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+4)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+7)];
	r0 = heap32[(r0+1)];
	r4 = heap32[(fp+6)];
if(!(r1 !=r4)) //_LBB831_3
{
	r4 = heap32[(fp+5)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+1)];
	r5 = _2E_str26;
	r4 = r4 == 0 ? r5 : r4;
	r5 = r0 == 0 ? r5 : r0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	strcmp(i7);
	r6 = r_g0;
if(!(r6 <0)) //_LBB831_3
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	strcmp(i7);
	r4 = r_g0;
	if(r4 >-1) //_LBB831_5
{
	r1 = r3 >> 2;
	heap32[(r1+2)] = r2;
	r1 = 0;
	r_g0 = r1;
	return;
}
}
}
	r4 = heap32[(fp+3)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+1)];
	r5 = _2E_str26;
	r4 = r4 == 0 ? r5 : r4;
	r0 = r0 == 0 ? r5 : r0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	strcmp(i7);
	r5 = r_g0;
if(!(r5 <0)) //_LBB831_7
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	strcmp(i7);
	r0 = r_g0;
if(!(r0 <0)) //_LBB831_7
{
	r0 = r3 >> 2;
	heap32[(r0)] = r1;
	heap32[(r0+1)] = r2;
	heap32[(r0+3)] = 1;
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}