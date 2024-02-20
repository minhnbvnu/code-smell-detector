function _ZN28btCompoundCollisionAlgorithmD0Ev(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV28btCompoundCollisionAlgorithm;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heap32[(r2+3)];
if(!(r1 <1)) //_LBB258_5
{
	r3 = 0;
_3: while(true){
	r4 = heap32[(r2+5)];
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
if(!(r4 ==0)) //_LBB258_4
{
	r6 = r4 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	heap32[(g0)] = r4;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r4 = heap32[(r2+1)];
	r6 = r4 >> 2;
	r7 = heap32[(r2+5)];
	r5 = (r7 + r5)|0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r5 = r5 >> 2;
	r6 = heap32[(r6+13)];
	r5 = heap32[(r5)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
}
	r3 = (r3 + 1)|0;
	if(r1 !=r3) //_LBB258_2
{
continue _3;
}
else{
break _3;
}
}
}
	r1 = heap32[(r2+5)];
if(!(r1 ==0)) //_LBB258_9
{
	r3 = heapU8[r0+24];
if(!(r3 ==0)) //_LBB258_8
{
	r3 = gNumAlignedFree;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r4 = (r4 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r3)] = r4;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r2+5)] = 0;
}
	r1 = 1;
	heap8[r0+24] = r1;
	heap32[(r2+5)] = 0;
	r1 = _ZTV30btActivatingCollisionAlgorithm;
	heap32[(r2+3)] = 0;
	r1 = (r1 + 8)|0;
	heap32[(r2+4)] = 0;
	heap32[(r2)] = r1;
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}