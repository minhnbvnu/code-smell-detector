function _ZN15btGjkConvexCast16calcTimeOfImpactERK11btTransformS2_S2_S2_RN12btConvexCast10CastResultE(sp)
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
	var r13;
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
	var f11;
	var f12;
	var f13;
var __label__ = 0;
	i7 = sp + -288;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+1)];
	r2 = 0;
	r3 = r1 >> 2;
	heap8[r1+312] = r2;
	r4 = 1;
	heap32[(r3)] = 0;
	heap8[r1+356] = r4;
	heap32[(r3+73)] = 1566444395;
	heap32[(r3+74)] = 1566444395;
	heap32[(r3+75)] = 1566444395;
	heap32[(r3+76)] = 0;
	heap8[r1+352] = r2;
	heap32[(r3+84)] = 0;
	heap32[(r3+85)] = 0;
	heap32[(r3+86)] = 0;
	heap32[(r3+87)] = 0;
	r3 = heapU8[r1+332];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+1)];
	r6 = heap32[(fp+4)];
	r7 = heap32[(fp+3)];
	r3 = r3 & 240;
	r4 = r4 >> 2;
	heap8[r1+332] = r3;
	r1 = r5 >> 2;
	r3 = r6 >> 2;
	r5 = r7 >> 2;
	r6 = _ZTV16btPointCollector;
	f0 = heapFloat[(r4+14)];
	f1 = heapFloat[(r1+14)];
	f2 = heapFloat[(r3+14)];
	f3 = heapFloat[(r5+14)];
	f4 = heapFloat[(r4+13)];
	f5 = heapFloat[(r1+13)];
	f6 = heapFloat[(r3+13)];
	f7 = heapFloat[(r5+13)];
	f8 = heapFloat[(r4+12)];
	f9 = heapFloat[(r1+12)];
	f10 = heapFloat[(r3+12)];
	f11 = heapFloat[(r5+12)];
	r7 = sp + -48;
	r6 = (r6 + 8)|0;
	r8 = r7 >> 2;
	heap32[(fp+-12)] = r6;
	heap32[(r8+9)] = 1566444395;
	heap8[sp+-8] = r2;
	r6 = heap32[(r0+3)];
	r9 = heap32[(r0+2)];
	r0 = heap32[(r0+1)];
	r10 = _ZTV17btGjkPairDetector;
	r11 = sp + -128;
	r10 = (r10 + 8)|0;
	heap32[(fp+-32)] = r10;
	r10 = r11 >> 2;
	heap32[(r10+1)] = 0;
	heap32[(r10+2)] = 1065353216;
	heap32[(r10+3)] = 0;
	heap32[(r10+4)] = 0;
	heap32[(r10+5)] = 0;
	heap32[(r10+6)] = r0;
	heap32[(r10+7)] = r9;
	r0 = r9 >> 2;
	heap32[(r10+8)] = r6;
	r12 = heap32[(r0+1)];
	heap32[(r10+9)] = r12;
	r12 = r6 >> 2;
	r13 = heap32[(r12+1)];
	heap32[(r10+10)] = r13;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+11)];
	heap32[(g0)] = r9;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	heapFloat[(r10+11)] = f_g0;
	r0 = heap32[(r12)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+11)];
	heap32[(g0)] = r6;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	heapFloat[(r10+12)] = f_g0;
	heap8[sp+-76] = r2;
	r0 = sp + -264;
	heap32[(r10+15)] = -1;
	r6 = r0 >> 2;
	heap32[(r10+18)] = 1;
	heap32[(r6+32)] = 1566444395;
	heap32[(r6+33)] = 0;
	heap32[(fp+-66)] = heap32[(r1)];
	heap32[(r6+1)] = heap32[(r1+1)];
	heap32[(r6+2)] = heap32[(r1+2)];
	heap32[(r6+3)] = heap32[(r1+3)];
	heap32[(r6+4)] = heap32[(r1+4)];
	heap32[(r6+5)] = heap32[(r1+5)];
	heap32[(r6+6)] = heap32[(r1+6)];
	heap32[(r6+7)] = heap32[(r1+7)];
	heap32[(r6+8)] = heap32[(r1+8)];
	heap32[(r6+9)] = heap32[(r1+9)];
	heap32[(r6+10)] = heap32[(r1+10)];
	heap32[(r6+11)] = heap32[(r1+11)];
	heap32[(r6+12)] = heap32[(r1+12)];
	heap32[(r6+13)] = heap32[(r1+13)];
	heap32[(r6+14)] = heap32[(r1+14)];
	heap32[(r6+15)] = heap32[(r1+15)];
	heap32[(r6+16)] = heap32[(r5)];
	heap32[(r6+17)] = heap32[(r5+1)];
	heap32[(r6+18)] = heap32[(r5+2)];
	heap32[(r6+19)] = heap32[(r5+3)];
	heap32[(r6+20)] = heap32[(r5+4)];
	heap32[(r6+21)] = heap32[(r5+5)];
	heap32[(r6+22)] = heap32[(r5+6)];
	heap32[(r6+23)] = heap32[(r5+7)];
	heap32[(r6+24)] = heap32[(r5+8)];
	heap32[(r6+25)] = heap32[(r5+9)];
	heap32[(r6+26)] = heap32[(r5+10)];
	heap32[(r6+27)] = heap32[(r5+11)];
	heap32[(r6+28)] = heap32[(r5+12)];
	heap32[(r6+29)] = heap32[(r5+13)];
	heap32[(r6+30)] = heap32[(r5+14)];
	heap32[(r6+31)] = heap32[(r5+15)];
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = 0;
	heap32[(g0+4)] = 0;
	_ZN17btGjkPairDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
	r9 = heapU8[sp+-8];
_1: do {
if(!(r9 ==0)) //_LBB540_14
{
	f0 = f0-f1;
	f1 = f2-f3;
	f2 = f4-f5;
	f3 = f6-f7;
	f4 = f8-f9;
	f5 = f10-f11;
	r9 = heap32[(fp+5)];
	f0 = f0-f1;
	f1 = f2-f3;
	f2 = f4-f5;
	f3 = heapFloat[(r8+8)];
	f4 = heapFloat[(r8+7)];
	f5 = heapFloat[(r8+6)];
	f6 = heapFloat[(r8+5)];
	f7 = heapFloat[(r8+9)];
	f8 = heapFloat[(r8+1)];
	f9 = heapFloat[(r8+2)];
	f10 = heapFloat[(r8+3)];
	f11 = heapFloat[(r8+4)];
	f12 =                         0;
_3: while(true){
	f13 =     0.0010000000474974513;
	if(f7 >f13) //_LBB540_2
{
	r2 = (r2 + 1)|0;
	if(r2 >32) //_LBB540_14
{
break _1;
}
else{
	f3 = f2*f8;
	f4 = f1*f9;
	f3 = f3+f4;
	f4 = f0*f10;
	f3 = f3+f4;
	f3 = f7/f3;
	f13 = f12-f3;
	f3 =                         0;
	if(f13 <f3) //_LBB540_14
{
break _1;
}
else{
	f4 =                         1;
	if(f13 >f4) //_LBB540_14
{
break _1;
}
else{
	if(f13 <=f12) //_LBB540_14
{
break _1;
}
else{
	r10 = r9 >> 2;
	r12 = heap32[(r10)];
	r12 = r12 >> 2;
	r12 = heap32[(r12)];
	heap32[(g0)] = r9;
	heapFloat[(g0+1)] = f13;
	__FUNCTION_TABLE__[(r12)>>2](i7);
	f5 = heapFloat[(r4+12)];
	f6 = heapFloat[(r1+12)];
	f4 = f4-f13;
	f6 = f6*f4;
	f5 = f5*f13;
	f5 = f6+f5;
	heapFloat[(r6+12)] = f5;
	f5 = heapFloat[(r1+13)];
	f6 = heapFloat[(r4+13)];
	f5 = f5*f4;
	f6 = f6*f13;
	f5 = f5+f6;
	heapFloat[(r6+13)] = f5;
	f5 = heapFloat[(r1+14)];
	f6 = heapFloat[(r4+14)];
	f5 = f5*f4;
	f6 = f6*f13;
	f5 = f5+f6;
	heapFloat[(r6+14)] = f5;
	f5 = heapFloat[(r5+12)];
	f6 = heapFloat[(r3+12)];
	f5 = f5*f4;
	f6 = f6*f13;
	f5 = f5+f6;
	heapFloat[(r6+28)] = f5;
	f5 = heapFloat[(r5+13)];
	f6 = heapFloat[(r3+13)];
	f5 = f5*f4;
	f6 = f6*f13;
	f5 = f5+f6;
	heapFloat[(r6+29)] = f5;
	f5 = heapFloat[(r5+14)];
	f6 = heapFloat[(r3+14)];
	f4 = f5*f4;
	f5 = f6*f13;
	f4 = f4+f5;
	heapFloat[(r6+30)] = f4;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = 0;
	heap32[(g0+4)] = 0;
	_ZN17btGjkPairDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(i7);
	r12 = heapU8[sp+-8];
	if(r12 ==0) //_LBB540_14
{
break _1;
}
else{
	f7 = heapFloat[(r8+9)];
	if(f7 >=f3) //_LBB540_9
{
	f6 = heapFloat[(r8+5)];
	f5 = heapFloat[(r8+6)];
	f4 = heapFloat[(r8+7)];
	f3 = heapFloat[(r8+8)];
	f8 = heapFloat[(r8+1)];
	f9 = heapFloat[(r8+2)];
	f10 = heapFloat[(r8+3)];
	f11 = heapFloat[(r8+4)];
	f12 = f13;
}
else{
__label__ = 8;
break _3;
}
}
}
}
}
}
}
else{
__label__ = 11;
break _3;
}
}
switch(__label__ ){//multiple entries
case 11:
	r0 = r9 >> 2;
	f2 = f8*f2;
	f1 = f9*f1;
	f7 = heapFloat[(r0+43)];
	f1 = f2+f1;
	f0 = f10*f0;
	f0 = f1+f0;
	f1 = -f7;
	if(f0 >=f1) //_LBB540_14
{
break _1;
}
else{
	heapFloat[(r0+41)] = f12;
	heapFloat[(r0+33)] = f8;
	heapFloat[(r0+34)] = f9;
	heapFloat[(r0+35)] = f10;
	heapFloat[(r0+36)] = f11;
	heapFloat[(r0+37)] = f6;
	heapFloat[(r0+38)] = f5;
	heapFloat[(r0+39)] = f4;
	heapFloat[(r0+40)] = f3;
}
break;
case 8:
	heapFloat[(r10+41)] = f13;
	f0 = heapFloat[(r8+4)];
	f1 = heapFloat[(r8+3)];
	f2 = heapFloat[(r8+2)];
	heap32[(r10+33)] = heap32[(r8+1)];
	heapFloat[(r10+34)] = f2;
	heapFloat[(r10+35)] = f1;
	heapFloat[(r10+36)] = f0;
	heap32[(r10+37)] = heap32[(r8+5)];
	heap32[(r10+38)] = heap32[(r8+6)];
	heap32[(r10+39)] = heap32[(r8+7)];
	heap32[(r10+40)] = heap32[(r8+8)];
break;
}
	r0 = 1;
	r_g0 = r0;
	return;
}
} while(0);
	r0 = 0;
	r_g0 = r0;
	return;
}