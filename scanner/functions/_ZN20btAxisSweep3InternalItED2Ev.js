function _ZN20btAxisSweep3InternalItED2Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV20btAxisSweep3InternalItE;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heap32[(r2+27)];
if(!(r1 ==0)) //_LBB69_5
{
	r1 = heap32[(r2+28)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = heap32[(r2+28)];
if(!(r1 ==0)) //_LBB69_3
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
	r1 = heap32[(r2+27)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = heap32[(r2+27)];
if(!(r1 ==0)) //_LBB69_5
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
}
	r1 = 0;
_8: while(true){
	r3 = r1 << 2;
	r3 = (r0 + r3)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3+22)];
if(!(r3 ==0)) //_LBB69_8
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	r1 = (r1 + -1)|0;
	if(r1 !=-3) //_LBB69_6
{
continue _8;
}
else{
break _8;
}
}
	r1 = heap32[(r2+15)];
if(!(r1 ==0)) //_LBB69_11
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
	r0 = heapU8[r0+100];
if(!(r0 ==0)) //_LBB69_14
{
	r0 = heap32[(r2+23)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = heap32[(r2+23)];
if(!(r0 ==0)) //_LBB69_14
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r1)] = r2;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	return;
}