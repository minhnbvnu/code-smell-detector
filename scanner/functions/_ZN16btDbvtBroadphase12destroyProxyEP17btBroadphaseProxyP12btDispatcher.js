function _ZN16btDbvtBroadphase12destroyProxyEP17btBroadphaseProxyP12btDispatcher(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(fp)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(r1+12)];
	r5 = heap32[(r1+15)];
	if(r5 !=2) //_LBB107_4
{
	r5 = (r2 + 4)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	r5 = r2 >> 2;
	_ZL10removeleafP6btDbvtP10btDbvtNode(i7);
	r6 = heap32[(r5+2)];
if(!(r6 ==0)) //_LBB107_6
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r8 = heap32[(r7)];
	r8 = (r8 + 1)|0;
	r6 = r6 >> 2;
	heap32[(r7)] = r8;
	r6 = heap32[(r6+-1)];
	heap32[(g0)] = r6;
	free(i7);
}
	heap32[(r5+2)] = r4;
	r4 = heap32[(r5+4)];
	r4 = (r4 + -1)|0;
	heap32[(r5+4)] = r4;
}
else{
	r5 = (r2 + 44)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	r5 = r2 >> 2;
	_ZL10removeleafP6btDbvtP10btDbvtNode(i7);
	r6 = heap32[(r5+12)];
if(!(r6 ==0)) //_LBB107_3
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r8 = heap32[(r7)];
	r8 = (r8 + 1)|0;
	r6 = r6 >> 2;
	heap32[(r7)] = r8;
	r6 = heap32[(r6+-1)];
	heap32[(g0)] = r6;
	free(i7);
}
	heap32[(r5+12)] = r4;
	r4 = heap32[(r5+14)];
	r4 = (r4 + -1)|0;
	heap32[(r5+14)] = r4;
}
	r4 = heap32[(r1+13)];
	r5 = heap32[(r1+14)];
	if(r4 ==0) //_LBB107_9
{
	r4 = heap32[(r1+15)];
	r4 = r4 << 2;
	r4 = (r2 + r4)|0;
	r4 = r4 >> 2;
	heap32[(r4+21)] = r5;
}
else{
	r4 = r4 >> 2;
	heap32[(r4+14)] = r5;
}
	r4 = heap32[(r1+14)];
if(!(r4 ==0)) //_LBB107_12
{
	r4 = r4 >> 2;
	r5 = heap32[(r1+13)];
	heap32[(r4+13)] = r5;
}
	r4 = r2 >> 2;
	r4 = heap32[(r4+24)];
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+4)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r5)>>2](i7);
if(!(r0 ==0)) //_LBB107_14
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r3 = heap32[(r0)];
	r3 = (r3 + 1)|0;
	heap32[(r0)] = r3;
	r0 = heap32[(r1+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	r0 = 1;
	heap8[r2+154] = r0;
	return;
}