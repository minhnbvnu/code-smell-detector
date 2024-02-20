function _ZN28btHashedOverlappingPairCache26processAllOverlappingPairsEP17btOverlapCallbackP12btDispatcher(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = 0;
	r4 = r3;
_1: while(true){
	r5 = r4 << 2;
_3: while(true){
	r6 = r0 >> 2;
	r7 = heap32[(r6+2)];
	if(r7 >r4) //_LBB130_1
{
	r7 = r1 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r8 = heap32[(r6+4)];
	r7 = heap32[(r7+2)];
	r9 = (r8 + r3)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r9;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r7 = r_g0;
	if(r7 ==0) //_LBB130_3
{
break _3;
}
else{
	r7 = r5 << 2;
	r6 = heap32[(r6)];
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	r6 = r6 >> 2;
	r6 = heap32[(r6+3)];
	r8 = heap32[(r7+1)];
	r7 = heap32[(r7)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r2;
	r7 = gOverlappingPairs;
	r7 = r7 >> 2;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = heap32[(r7)];
	r6 = (r6 + -1)|0;
	heap32[(r7)] = r6;
continue _3;
}
}
else{
break _1;
}
}
	r4 = (r4 + 1)|0;
	r3 = (r3 + 16)|0;
continue _1;
}
	return;
}