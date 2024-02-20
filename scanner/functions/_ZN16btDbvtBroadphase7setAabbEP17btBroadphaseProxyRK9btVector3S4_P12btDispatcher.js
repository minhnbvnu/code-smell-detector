function _ZN16btDbvtBroadphase7setAabbEP17btBroadphaseProxyRK9btVector3S4_P12btDispatcher(sp)
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
	var r11;
	var r12;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
	var f9;
	var f10;
var __label__ = 0;
	i7 = sp + -88;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r0 = r0 >> 2;
	f0 = heapFloat[(r0)];
	r1 = sp + -32;
	heapFloat[(fp+-8)] = f0;
	f1 = heapFloat[(r0+1)];
	r2 = r1 >> 2;
	heapFloat[(r2+1)] = f1;
	f2 = heapFloat[(r0+2)];
	heapFloat[(r2+2)] = f2;
	f3 = heapFloat[(r0+3)];
	r3 = heap32[(fp+3)];
	r3 = r3 >> 2;
	heapFloat[(r2+3)] = f3;
	f4 = heapFloat[(r3)];
	heapFloat[(r2+4)] = f4;
	f5 = heapFloat[(r3+1)];
	heapFloat[(r2+5)] = f5;
	f6 = heapFloat[(r3+2)];
	heapFloat[(r2+6)] = f6;
	f7 = heapFloat[(r3+3)];
	r4 = heap32[(fp+1)];
	r5 = heap32[(fp)];
	r6 = r4 >> 2;
	heapFloat[(r2+7)] = f7;
	r7 = heap32[(r6+15)];
_1: do {
	if(r7 !=2) //_LBB109_9
{
	r2 = r5 >> 2;
	r8 = heap32[(r2+32)];
	r8 = (r8 + 1)|0;
	heap32[(r2+32)] = r8;
	r8 = heap32[(r6+12)];
	r7 = r8 >> 2;
	f8 = heapFloat[(r7)];
if(!(f8 >f4)) //_LBB109_24
{
	f8 = heapFloat[(r7+4)];
if(!(f8 <f0)) //_LBB109_24
{
	f8 = heapFloat[(r7+1)];
if(!(f8 >f5)) //_LBB109_24
{
	f8 = heapFloat[(r7+5)];
if(!(f8 <f1)) //_LBB109_24
{
	f8 = heapFloat[(r7+2)];
if(!(f8 >f6)) //_LBB109_24
{
	f8 = heapFloat[(r7+6)];
if(!(f8 <f2)) //_LBB109_24
{
	f0 = heapFloat[(r6+4)];
	f1 = heapFloat[(r6+8)];
	f1 = f1-f0;
	f2 =                       0.5;
	f3 = heapFloat[(r6+5)];
	f4 = heapFloat[(r6+9)];
	f4 = f4-f3;
	f5 = heapFloat[(r0+1)];
	f6 = heapFloat[(r0)];
	f1 = f1*f2;
	f7 = heapFloat[(r2+25)];
	f8 = heapFloat[(r0+2)];
	f9 = heapFloat[(r6+6)];
	f10 = heapFloat[(r6+10)];
	r7 = sp + -48;
	f10 = f10-f9;
	f4 = f4*f2;
	f1 = f1*f7;
	f2 = f10*f2;
	f4 = f4*f7;
	r9 = r7 >> 2;
	heapFloat[(fp+-12)] = f1;
	f2 = f2*f7;
	heapFloat[(r9+1)] = f4;
	heapFloat[(r9+2)] = f2;
	heap32[(r9+3)] = 0;
	f0 = f6-f0;
	f6 =                         0;
if(!(f0 >=f6)) //_LBB109_17
{
	f0 = -f1;
	heapFloat[(fp+-12)] = f0;
}
	f0 = f5-f3;
if(!(f0 >=f6)) //_LBB109_19
{
	f0 = -f4;
	heapFloat[(r9+1)] = f0;
}
	f0 = f8-f9;
if(!(f0 >=f6)) //_LBB109_21
{
	f0 = -f2;
	heapFloat[(r9+2)] = f0;
}
	r9 = (r5 + 4)|0;
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r7;
	heap32[(g0+4)] = 1028443341;
	_ZN6btDbvt6updateEP10btDbvtNodeR12btDbvtAabbMmRK9btVector3f(i7);
	r8 = r_g0;
	if(r8 !=0) //_LBB109_23
{
	r7 = heap32[(r2+33)];
	r8 = 1;
	r7 = (r7 + 1)|0;
	heap32[(r2+33)] = r7;
break _1;
}
else{
	r8 = 0;
break _1;
}
}
}
}
}
}
}
	r1 = (r5 + 4)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r8;
	_ZL10removeleafP6btDbvtP10btDbvtNode(i7);
	r9 = r_g0;
_23: do {
	if(r9 !=0) //_LBB109_26
{
	r11 = heap32[(r2+3)];
	if(r11 <0) //_LBB109_31
{
	r10 = heap32[(r2+1)];
}
else{
	r12 = -1;
_28: while(true){
	r10 = r9;
	r12 = (r12 + 1)|0;
	if(r11 >r12) //_LBB109_30
{
	r9 = r10 >> 2;
	r9 = heap32[(r9+8)];
	if(r9 ==0) //_LBB109_29
{
break _23;
}
}
else{
break _23;
}
}
}
}
else{
	r10 = 0;
}
} while(0);
	heapFloat[(r7)] = f0;
	heapFloat[(r7+1)] = f1;
	heapFloat[(r7+2)] = f2;
	heapFloat[(r7+3)] = f3;
	heapFloat[(r7+4)] = f4;
	heapFloat[(r7+5)] = f5;
	heapFloat[(r7+6)] = f6;
	heapFloat[(r7+7)] = f7;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r8;
	_ZL10insertleafP6btDbvtP10btDbvtNodeS2_(i7);
	r1 = heap32[(r2+33)];
	r8 = 1;
	r1 = (r1 + 1)|0;
	heap32[(r2+33)] = r1;
}
else{
	r1 = heap32[(r6+12)];
	r7 = (r5 + 44)|0;
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r1;
	r7 = r5 >> 2;
	_ZL10removeleafP6btDbvtP10btDbvtNode(i7);
	r8 = heap32[(r7+12)];
if(!(r8 ==0)) //_LBB109_3
{
	r9 = gNumAlignedFree;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r10 = (r10 + 1)|0;
	r8 = r8 >> 2;
	heap32[(r9)] = r10;
	r8 = heap32[(r8+-1)];
	heap32[(g0)] = r8;
	free(i7);
}
	heap32[(r7+12)] = r1;
	r1 = heap32[(r7+14)];
	r1 = (r1 + -1)|0;
	heap32[(r7+14)] = r1;
	r1 = heap32[(r7+2)];
	r8 = (r5 + 4)|0;
	if(r1 ==0) //_LBB109_5
{
	r1 = gNumAlignedAllocs;
	r1 = r1 >> 2;
	r9 = heap32[(r1)];
	r9 = (r9 + 1)|0;
	heap32[(r1)] = r9;
	heap32[(g0)] = 63;
	malloc(i7);
	r1 = r_g0;
	if(r1 !=0) //_LBB109_7
{
	r9 = 0;
	r10 = (r1 + 4)|0;
	r9 = (r9 - r10)|0;
	r9 = r9 & 15;
	r9 = (r1 + r9)|0;
	r10 = (r9 + 4)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r1;
	r1 = r10;
}
}
else{
	heap32[(r7+2)] = 0;
}
	r9 = r1 >> 2;
	heap32[(r9+8)] = 0;
	heap32[(r9+9)] = r4;
	heap32[(r9+10)] = 0;
	heap32[(r9)] = heap32[(fp+-8)];
	heap32[(r9+1)] = heap32[(r2+1)];
	heap32[(r9+2)] = heap32[(r2+2)];
	heap32[(r9+3)] = heap32[(r2+3)];
	heapFloat[(r9+4)] = f4;
	heapFloat[(r9+5)] = f5;
	heapFloat[(r9+6)] = f6;
	heapFloat[(r9+7)] = f7;
	r2 = heap32[(r7+1)];
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	_ZL10insertleafP6btDbvtP10btDbvtNodeS2_(i7);
	r2 = heap32[(r7+4)];
	r2 = (r2 + 1)|0;
	r8 = 1;
	heap32[(r7+4)] = r2;
	heap32[(r6+12)] = r1;
}
} while(0);
	r1 = heap32[(r6+13)];
	r2 = heap32[(r6+14)];
	if(r1 ==0) //_LBB109_35
{
	r1 = heap32[(r6+15)];
	r1 = r1 << 2;
	r1 = (r5 + r1)|0;
	r1 = r1 >> 2;
	heap32[(r1+21)] = r2;
}
else{
	r1 = r1 >> 2;
	heap32[(r1+14)] = r2;
}
	r1 = heap32[(r6+14)];
if(!(r1 ==0)) //_LBB109_38
{
	r1 = r1 >> 2;
	r2 = heap32[(r6+13)];
	heap32[(r1+13)] = r2;
}
	heap32[(r6+4)] = heap32[(r0)];
	heap32[(r6+5)] = heap32[(r0+1)];
	heap32[(r6+6)] = heap32[(r0+2)];
	heap32[(r6+7)] = heap32[(r0+3)];
	heap32[(r6+8)] = heap32[(r3)];
	heap32[(r6+9)] = heap32[(r3+1)];
	heap32[(r6+10)] = heap32[(r3+2)];
	r0 = r5 >> 2;
	heap32[(r6+11)] = heap32[(r3+3)];
	r1 = heap32[(r0+26)];
	heap32[(r6+15)] = r1;
	r1 = heap32[(r0+26)];
	r1 = r1 << 2;
	r1 = (r5 + r1)|0;
	r1 = r1 >> 2;
	heap32[(r6+13)] = 0;
	r2 = heap32[(r1+21)];
	heap32[(r6+14)] = r2;
	r2 = heap32[(r1+21)];
if(!(r2 ==0)) //_LBB109_40
{
	r2 = r2 >> 2;
	heap32[(r2+13)] = r4;
}
	r2 = r8 & 1;
	heap32[(r1+21)] = r4;
if(!(r2 ==0)) //_LBB109_43
{
	r1 = 1;
	heap8[r5+154] = r1;
	r1 = heapU8[r5+153];
if(!(r1 !=0)) //_LBB109_43
{
	r1 = _ZTV18btDbvtTreeCollider;
	r2 = sp + -64;
	r1 = (r1 + 8)|0;
	r3 = r2 >> 2;
	heap32[(fp+-16)] = r1;
	heap32[(r3+1)] = r5;
	r1 = heap32[(r6+12)];
	r3 = heap32[(r0+11)];
	r4 = (r5 + 44)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r2;
	_ZN6btDbvt24collideTTpersistentStackEPK10btDbvtNodeS2_RNS_8ICollideE(i7);
	r1 = heap32[(r6+12)];
	r0 = heap32[(r0+1)];
	r3 = (r5 + 4)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r2;
	_ZN6btDbvt24collideTTpersistentStackEPK10btDbvtNodeS2_RNS_8ICollideE(i7);
}
}
	return;
}