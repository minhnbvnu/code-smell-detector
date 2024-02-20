function _ZNK10__cxxabiv120__si_class_type_info12__do_dyncastEiNS_17__class_type_info10__sub_kindEPKS1_PKvS4_S6_RNS1_16__dyncast_resultE(sp)
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
	var r7;
	var r8;
	var r9;
	var r10;
var __label__ = 0;
	i7 = sp + -32;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
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
	r5 = heap32[(fp+1)];
	r6 = heap32[(fp+2)];
	r7 = heap32[(fp+4)];
	r8 = heap32[(fp+6)];
	r9 = heap32[(fp+7)];
	strcmp(i7);
	r10 = r_g0;
	if(r10 <0) //_LBB835_6
{
__label__ = 6;
}
else{
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	strcmp(i7);
	r2 = r_g0;
	if(r2 <0) //_LBB835_6
{
__label__ = 6;
}
else{
	r0 = r9 >> 2;
	heap32[(r0)] = r7;
	heap32[(r0+1)] = r6;
	if(r5 <0) //_LBB835_4
{
	if(r5 !=-2) //_LBB835_11
{
__label__ = 11;
}
else{
	heap32[(r0+3)] = 1;
__label__ = 11;
}
}
else{
	r1 = (r7 + r5)|0;
	r3 = 6;
	r4 = 1;
	r1 = r1 == r8 ? r3 : r4;
	heap32[(r0+3)] = r1;
__label__ = 11;
}
}
}
_8: do {
if (__label__ == 6){
	r2 = heap32[(fp+5)];
if(!(r7 !=r8)) //_LBB835_9
{
	r10 = r2 >> 2;
	r10 = heap32[(r10+1)];
	r4 = r10 == 0 ? r4 : r10;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	strcmp(i7);
	r10 = r_g0;
if(!(r10 <0)) //_LBB835_9
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	strcmp(i7);
	r3 = r_g0;
	if(r3 >-1) //_LBB835_10
{
	r0 = r9 >> 2;
	heap32[(r0+2)] = r6;
break _8;
}
}
}
	r1 = heap32[(r1+2)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+6)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r0;
	heap32[(g0+4)] = r7;
	heap32[(g0+5)] = r2;
	heap32[(g0+6)] = r8;
	heap32[(g0+7)] = r9;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	return;
}
} while(0);
	r0 = 0;
	r_g0 = r0;
	return;
}