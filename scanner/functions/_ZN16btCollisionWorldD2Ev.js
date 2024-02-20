function _ZN16btCollisionWorldD2Ev(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV16btCollisionWorld;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heap32[(r2+4)];
	r3 = heap32[(r2+2)];
	if(r3 >0) //_LBB234_2
{
	r3 = 0;
_3: while(true){
	r4 = r3 << 2;
	r1 = (r1 + r4)|0;
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r4 = heap32[(r1+47)];
if(!(r4 ==0)) //_LBB234_5
{
	r5 = heap32[(r2+20)];
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+9)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r6 = r_g0 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+10)];
	r7 = heap32[(r2+6)];
	heap32[(g0)] = r_g0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r7;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r5 = heap32[(r2+20)];
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+3)];
	r7 = heap32[(r2+6)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r7;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	heap32[(r1+47)] = 0;
}
	r3 = (r3 + 1)|0;
	r1 = heap32[(r2+4)];
	r4 = heap32[(r2+2)];
	if(r4 >r3) //_LBB234_3
{
continue _3;
}
else{
break _3;
}
}
}
if(!(r1 ==0)) //_LBB234_10
{
	r3 = heapU8[r0+20];
if(!(r3 ==0)) //_LBB234_9
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
	heap32[(r2+4)] = 0;
}
	r1 = 1;
	heap8[r0+20] = r1;
	heap32[(r2+4)] = 0;
	heap32[(r2+2)] = 0;
	heap32[(r2+3)] = 0;
	return;
}