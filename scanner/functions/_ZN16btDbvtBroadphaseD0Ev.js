function _ZN16btDbvtBroadphaseD0Ev(sp)
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
	r1 = _ZTV16btDbvtBroadphase;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heapU8[r0+152];
if(!(r1 ==0)) //_LBB110_3
{
	r1 = heap32[(r2+24)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = heap32[(r2+24)];
if(!(r1 ==0)) //_LBB110_3
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	r3 = (r3 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r2)] = r3;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	r1 = (r0 + 4)|0;
if(!(r1 ==0)) //_LBB110_15
{
	r2 = (r1 + 80)|0;
if(!(r2 ==r1)) //_LBB110_15
{
	r1 = (r0 + 44)|0;
	r2 = 0;
_8: while(true){
	r3 = (r0 + r2)|0;
	r4 = r3 >> 2;
	r5 = heap32[(r4+11)];
if(!(r5 ==0)) //_LBB110_8
{
	r6 = (r1 + r2)|0;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r5;
	_ZL17recursedeletenodeP6btDbvtP10btDbvtNode(i7);
}
	r5 = heap32[(r4+12)];
if(!(r5 ==0)) //_LBB110_10
{
	r6 = gNumAlignedFree;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r7 = (r7 + 1)|0;
	r5 = r5 >> 2;
	heap32[(r6)] = r7;
	r5 = heap32[(r5+-1)];
	heap32[(g0)] = r5;
	free(i7);
}
	heap32[(r4+12)] = 0;
	heap32[(r4+13)] = -1;
	r5 = heap32[(r4+19)];
if(!(r5 ==0)) //_LBB110_14
{
	r6 = heapU8[r3+80];
if(!(r6 ==0)) //_LBB110_13
{
	r6 = gNumAlignedFree;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r7 = (r7 + 1)|0;
	r5 = r5 >> 2;
	heap32[(r6)] = r7;
	r5 = heap32[(r5+-1)];
	heap32[(g0)] = r5;
	free(i7);
}
	heap32[(r4+19)] = 0;
}
	r5 = 1;
	heap32[(r4+15)] = 0;
	heap8[r3+80] = r5;
	heap32[(r4+19)] = 0;
	r2 = (r2 + -40)|0;
	heap32[(r4+17)] = 0;
	heap32[(r4+18)] = 0;
	if(r2 !=-80) //_LBB110_6
{
continue _8;
}
else{
break _8;
}
}
}
}
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}