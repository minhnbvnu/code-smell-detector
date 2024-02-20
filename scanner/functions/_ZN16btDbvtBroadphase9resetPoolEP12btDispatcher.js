function _ZN16btDbvtBroadphase9resetPoolEP12btDispatcher(sp)
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
	r1 = r0 >> 2;
	r2 = 0;
	r3 = heap32[(r1+14)];
	r4 = heap32[(r1+4)];
	r3 = (r2 - r3)|0;
if(!(r4 !=r3)) //_LBB100_18
{
	r3 = heap32[(r1+1)];
if(!(r3 ==0)) //_LBB100_3
{
	r4 = (r0 + 4)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	_ZL17recursedeletenodeP6btDbvtP10btDbvtNode(i7);
}
	r3 = heap32[(r1+2)];
if(!(r3 ==0)) //_LBB100_5
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
	heap32[(r1+2)] = 0;
	heap32[(r1+3)] = -1;
	r3 = heap32[(r1+9)];
if(!(r3 ==0)) //_LBB100_9
{
	r4 = heapU8[r0+40];
if(!(r4 ==0)) //_LBB100_8
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
	heap32[(r1+9)] = 0;
}
	r3 = 1;
	heap8[r0+40] = r3;
	heap32[(r1+9)] = 0;
	heap32[(r1+7)] = 0;
	heap32[(r1+8)] = 0;
	heap32[(r1+5)] = 0;
	r4 = heap32[(r1+11)];
if(!(r4 ==0)) //_LBB100_11
{
	r5 = (r0 + 44)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	_ZL17recursedeletenodeP6btDbvtP10btDbvtNode(i7);
}
	r4 = heap32[(r1+12)];
if(!(r4 ==0)) //_LBB100_13
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r6 = (r6 + 1)|0;
	r4 = r4 >> 2;
	heap32[(r5)] = r6;
	r4 = heap32[(r4+-1)];
	heap32[(g0)] = r4;
	free(i7);
}
	heap32[(r1+12)] = 0;
	heap32[(r1+13)] = -1;
	r4 = heap32[(r1+19)];
if(!(r4 ==0)) //_LBB100_17
{
	r5 = heapU8[r0+80];
if(!(r5 ==0)) //_LBB100_16
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r6 = (r6 + 1)|0;
	r4 = r4 >> 2;
	heap32[(r5)] = r6;
	r4 = heap32[(r4+-1)];
	heap32[(g0)] = r4;
	free(i7);
}
	heap32[(r1+19)] = 0;
}
	heap8[r0+80] = r3;
	heap32[(r1+19)] = 0;
	heap32[(r1+17)] = 0;
	heap32[(r1+18)] = 0;
	heap32[(r1+15)] = 0;
	heap8[r0+153] = r2;
	heap8[r0+154] = r3;
	heap32[(r1+26)] = 0;
	heap32[(r1+31)] = 0;
	heap32[(r1+27)] = 1;
	heap32[(r1+28)] = 0;
	heap32[(r1+29)] = 10;
	heap32[(r1+30)] = 1;
	heap32[(r1+32)] = 0;
	heap32[(r1+33)] = 0;
	heap32[(r1+34)] = 0;
	heap32[(r1+37)] = 0;
	heap32[(r1+35)] = 0;
	heap32[(r1+36)] = 0;
	heap32[(r1+21)] = 0;
	heap32[(r1+22)] = 0;
	heap32[(r1+23)] = 0;
}
	return;
}