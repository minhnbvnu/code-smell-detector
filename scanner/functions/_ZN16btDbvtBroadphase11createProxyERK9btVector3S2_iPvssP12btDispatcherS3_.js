function _ZN16btDbvtBroadphase11createProxyERK9btVector3S2_iPvssP12btDispatcherS3_(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
var __label__ = 0;
	i7 = sp + -64;var g0 = i7>>2; // save stack
	r0 = gNumAlignedAllocs;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = (r1 + 1)|0;
	heap32[(r0)] = r2;
	heap32[(g0)] = 83;
	malloc(i7);
	r2 = r_g0;
	r3 = heap32[(fp)];
	r4 = heap32[(fp+1)];
	r5 = heap32[(fp+2)];
	r6 = heap32[(fp+4)];
	r7 = heap32[(fp+5)];
	r8 = heap32[(fp+6)];
	if(r2 !=0) //_LBB104_2
{
	r9 = 0;
	r10 = (r2 + 4)|0;
	r9 = (r9 - r10)|0;
	r9 = r9 & 15;
	r9 = (r2 + r9)|0;
	r10 = (r9 + 4)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r2;
	r2 = r10;
}
	r9 = r2 >> 2;
	heap32[(r9)] = r6;
	heap16[(r2+4)>>1] = r7;
	r4 = r4 >> 2;
	heap16[(r2+6)>>1] = r8;
	f0 = heapFloat[(r4)];
	heapFloat[(r9+4)] = f0;
	f1 = heapFloat[(r4+1)];
	heapFloat[(r9+5)] = f1;
	f2 = heapFloat[(r4+2)];
	heapFloat[(r9+6)] = f2;
	f3 = heapFloat[(r4+3)];
	r4 = r5 >> 2;
	heapFloat[(r9+7)] = f3;
	f4 = heapFloat[(r4)];
	heapFloat[(r9+8)] = f4;
	f5 = heapFloat[(r4+1)];
	heapFloat[(r9+9)] = f5;
	f6 = heapFloat[(r4+2)];
	heapFloat[(r9+10)] = f6;
	f7 = heapFloat[(r4+3)];
	heapFloat[(r9+11)] = f7;
	heap32[(r9+2)] = 0;
	heap32[(r9+14)] = 0;
	r4 = sp + -32;
	heap32[(r9+13)] = 0;
	r5 = r4 >> 2;
	heapFloat[(fp+-8)] = f0;
	heapFloat[(r5+1)] = f1;
	heapFloat[(r5+2)] = f2;
	heapFloat[(r5+3)] = f3;
	heapFloat[(r5+4)] = f4;
	heapFloat[(r5+5)] = f5;
	heapFloat[(r5+6)] = f6;
	r6 = r3 >> 2;
	heapFloat[(r5+7)] = f7;
	r5 = heap32[(r6+26)];
	heap32[(r9+15)] = r5;
	r5 = heap32[(r6+37)];
	r5 = (r5 + 1)|0;
	heap32[(r6+37)] = r5;
	heap32[(r9+3)] = r5;
	r5 = heap32[(r6+2)];
	r7 = (r3 + 4)|0;
	if(r5 ==0) //_LBB104_5
{
	r5 = (r1 + 2)|0;
	heap32[(r0)] = r5;
	heap32[(g0)] = 63;
	malloc(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB104_7
{
	r0 = 0;
	r1 = (r5 + 4)|0;
	r0 = (r0 - r1)|0;
	r0 = r0 & 15;
	r0 = (r5 + r0)|0;
	r1 = (r0 + 4)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r5;
	r5 = r1;
}
}
else{
	heap32[(r6+2)] = 0;
}
	r0 = r5 >> 2;
	heap32[(r0+8)] = 0;
	heap32[(r0+9)] = r2;
	heap32[(r0+10)] = 0;
	heapFloat[(r0)] = f0;
	heapFloat[(r0+1)] = f1;
	heapFloat[(r0+2)] = f2;
	heapFloat[(r0+3)] = f3;
	heapFloat[(r0+4)] = f4;
	heapFloat[(r0+5)] = f5;
	heapFloat[(r0+6)] = f6;
	heapFloat[(r0+7)] = f7;
	r0 = heap32[(r6+1)];
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r5;
	_ZL10insertleafP6btDbvtP10btDbvtNodeS2_(i7);
	r0 = heap32[(r6+4)];
	r0 = (r0 + 1)|0;
	heap32[(r6+4)] = r0;
	heap32[(r9+12)] = r5;
	r0 = heap32[(r6+26)];
	r0 = r0 << 2;
	r0 = (r3 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r9+13)] = 0;
	r1 = heap32[(r0+21)];
	heap32[(r9+14)] = r1;
if(!(r1 ==0)) //_LBB104_10
{
	r1 = r1 >> 2;
	heap32[(r1+13)] = r2;
}
	heap32[(r0+21)] = r2;
	r0 = heapU8[r3+153];
if(!(r0 !=0)) //_LBB104_12
{
	r0 = _ZTV18btDbvtTreeCollider;
	r0 = (r0 + 8)|0;
	r1 = sp + -48;
	r5 = r1 >> 2;
	heap32[(fp+-12)] = r0;
	heap32[(r5+1)] = r3;
	heap32[(r5+2)] = r2;
	r3 = heap32[(r6+1)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	_ZN6btDbvt9collideTVEPK10btDbvtNodeRK12btDbvtAabbMmRNS_8ICollideE(i7);
	r3 = heap32[(r6+11)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	_ZN6btDbvt9collideTVEPK10btDbvtNodeRK12btDbvtAabbMmRNS_8ICollideE(i7);
	heap32[(fp+-12)] = r0;
}
	r_g0 = r2;
	return;
}