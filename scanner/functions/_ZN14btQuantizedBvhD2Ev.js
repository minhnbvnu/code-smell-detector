function _ZN14btQuantizedBvhD2Ev(sp)
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
	r1 = _ZTV14btQuantizedBvh;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heap32[(r2+40)];
if(!(r1 ==0)) //_LBB149_4
{
	r3 = heapU8[r0+164];
if(!(r3 ==0)) //_LBB149_3
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
	heap32[(r2+40)] = 0;
}
	r1 = 1;
	heap8[r0+164] = r1;
	heap32[(r2+40)] = 0;
	heap32[(r2+38)] = 0;
	heap32[(r2+39)] = 0;
	r3 = heap32[(r2+34)];
if(!(r3 ==0)) //_LBB149_8
{
	r4 = heapU8[r0+140];
if(!(r4 ==0)) //_LBB149_7
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
	heap32[(r2+34)] = 0;
}
	heap8[r0+140] = r1;
	heap32[(r2+34)] = 0;
	heap32[(r2+32)] = 0;
	heap32[(r2+33)] = 0;
	r3 = heap32[(r2+29)];
if(!(r3 ==0)) //_LBB149_12
{
	r4 = heapU8[r0+120];
if(!(r4 ==0)) //_LBB149_11
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
	heap32[(r2+29)] = 0;
}
	heap8[r0+120] = r1;
	heap32[(r2+29)] = 0;
	heap32[(r2+27)] = 0;
	heap32[(r2+28)] = 0;
	r3 = heap32[(r2+24)];
if(!(r3 ==0)) //_LBB149_16
{
	r4 = heapU8[r0+100];
if(!(r4 ==0)) //_LBB149_15
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
	heap32[(r2+24)] = 0;
}
	heap8[r0+100] = r1;
	heap32[(r2+24)] = 0;
	heap32[(r2+22)] = 0;
	heap32[(r2+23)] = 0;
	r3 = heap32[(r2+19)];
if(!(r3 ==0)) //_LBB149_20
{
	r4 = heapU8[r0+80];
if(!(r4 ==0)) //_LBB149_19
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
	heap32[(r2+19)] = 0;
}
	heap8[r0+80] = r1;
	heap32[(r2+19)] = 0;
	heap32[(r2+17)] = 0;
	heap32[(r2+18)] = 0;
	return;
}