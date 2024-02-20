function _ZN22btCompoundLeafCallback17ProcessChildShapeEP16btCollisionShapei(sp)
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
	var f14;
	var f15;
	var f16;
	var f17;
	var f18;
	var f19;
	var f20;
	var f21;
	var f22;
	var f23;
	var f24;
	var f25;
	var f26;
	var f27;
	var f28;
	var f29;
	var f30;
var __label__ = 0;
	i7 = sp + -264;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	if(r0 >-1) //_LBB255_2
{
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r2 = heap32[(r1+1)];
	r2 = r2 >> 2;
	r3 = heap32[(r2+48)];
	r3 = r3 >> 2;
	r4 = heap32[(r3+4)];
	if(r4 >r0) //_LBB255_4
{
	r4 = heap32[(fp+1)];
	r3 = heap32[(r3+6)];
	r5 = (r0 * 80)|0;
	r3 = (r3 + r5)|0;
	r3 = r3 >> 2;
	f0 = heapFloat[(r2+1)];
	f1 = heapFloat[(r3)];
	f2 = heapFloat[(r2+2)];
	f3 = heapFloat[(r3+4)];
	f4 = heapFloat[(r3+1)];
	f5 = heapFloat[(r3+5)];
	f6 = heapFloat[(r2+3)];
	f7 = heapFloat[(r3+8)];
	f8 = f1*f0;
	f9 = f3*f2;
	f10 = heapFloat[(r2+5)];
	f11 = heapFloat[(r2+6)];
	f12 = heapFloat[(r2+9)];
	f13 = heapFloat[(r3+12)];
	f14 = heapFloat[(r3+2)];
	f15 = heapFloat[(r2+10)];
	f16 = heapFloat[(r3+13)];
	f17 = heapFloat[(r3+6)];
	f18 = heapFloat[(r2+7)];
	f19 = heapFloat[(r3+14)];
	f20 = heapFloat[(r2+11)];
	f21 = heapFloat[(r3+10)];
	f22 = heapFloat[(r3+9)];
	f23 = heapFloat[(r2+4)];
	f24 = heapFloat[(r2+8)];
	heapFloat[(fp+-59)] = f24;
	f24 = heapFloat[(r2+12)];
	heapFloat[(fp+-57)] = f24;
	f24 = heapFloat[(r2+13)];
	f25 = heapFloat[(r2+14)];
	f26 = heapFloat[(r2+15)];
	f27 = heapFloat[(r2+16)];
	heapFloat[(fp+-58)] = f27;
	f27 = heapFloat[(r2+17)];
	heapFloat[(fp+-42)] = f27;
	f27 = heapFloat[(r2+18)];
	heapFloat[(fp+-41)] = f27;
	f27 = heapFloat[(r2+19)];
	heapFloat[(fp+-44)] = f27;
	f27 = heapFloat[(r2+20)];
	heapFloat[(fp+-43)] = f27;
	f27 = heapFloat[(r2+21)];
	heapFloat[(fp+-46)] = f27;
	f27 = heapFloat[(r2+22)];
	heapFloat[(fp+-45)] = f27;
	f27 = heapFloat[(r2+23)];
	heapFloat[(fp+-48)] = f27;
	f27 = heapFloat[(r2+24)];
	heapFloat[(fp+-47)] = f27;
	f27 = heapFloat[(r2+25)];
	heapFloat[(fp+-50)] = f27;
	f27 = heapFloat[(r2+26)];
	heapFloat[(fp+-49)] = f27;
	f27 = heapFloat[(r2+27)];
	heapFloat[(fp+-52)] = f27;
	f27 = heapFloat[(r2+28)];
	heapFloat[(fp+-51)] = f27;
	f27 = heapFloat[(r2+29)];
	heapFloat[(fp+-54)] = f27;
	f27 = heapFloat[(r2+30)];
	heapFloat[(fp+-53)] = f27;
	f27 = heapFloat[(r2+31)];
	heapFloat[(fp+-56)] = f27;
	f27 = heapFloat[(r2+32)];
	heapFloat[(fp+-55)] = f27;
	f27 = f4*f0;
	f28 = f5*f2;
	f8 = f8+f9;
	f9 = f7*f6;
	r2 = sp + -96;
	f29 = f14*f0;
	f30 = f17*f2;
	f27 = f27+f28;
	f28 = f22*f6;
	f8 = f8+f9;
	r3 = r2 >> 2;
	f9 = f29+f30;
	f29 = f21*f6;
	f27 = f27+f28;
	heapFloat[(fp+-24)] = f8;
	f8 = f1*f10;
	f28 = f3*f11;
	f9 = f9+f29;
	heapFloat[(r3+1)] = f27;
	heapFloat[(r3+2)] = f9;
	f9 = f4*f10;
	f27 = f5*f11;
	f8 = f8+f28;
	f28 = f7*f18;
	f29 = f14*f10;
	f30 = f17*f11;
	f9 = f9+f27;
	f27 = f22*f18;
	f8 = f8+f28;
	heap32[(r3+3)] = 0;
	f28 = f29+f30;
	f29 = f21*f18;
	f9 = f9+f27;
	heapFloat[(r3+4)] = f8;
	f1 = f1*f12;
	f3 = f3*f15;
	f8 = f28+f29;
	heapFloat[(r3+5)] = f9;
	heapFloat[(r3+6)] = f8;
	f4 = f4*f12;
	f5 = f5*f15;
	f1 = f1+f3;
	f3 = f7*f20;
	f7 = f14*f12;
	f8 = f17*f15;
	f4 = f4+f5;
	f5 = f22*f20;
	f1 = f1+f3;
	heap32[(r3+7)] = 0;
	f3 = f0*f13;
	f9 = f2*f16;
	f7 = f7+f8;
	f8 = f21*f20;
	f4 = f4+f5;
	heapFloat[(r3+8)] = f1;
	f1 = f10*f13;
	f5 = f11*f16;
	f3 = f3+f9;
	f9 = f6*f19;
	f7 = f7+f8;
	heapFloat[(r3+9)] = f4;
	f3 = f3+f9;
	heapFloat[(r3+10)] = f7;
	f4 = f12*f13;
	f7 = f15*f16;
	f1 = f1+f5;
	f5 = f18*f19;
	f1 = f1+f5;
	f4 = f4+f7;
	f5 = f20*f19;
	f3 = f3+f24;
	heap32[(r3+11)] = 0;
	f4 = f4+f5;
	f1 = f1+f25;
	heapFloat[(r3+12)] = f3;
	f3 = f4+f26;
	heapFloat[(r3+13)] = f1;
	heapFloat[(r3+14)] = f3;
	r5 = r4 >> 2;
	heap32[(r3+15)] = 0;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+2)];
	r6 = sp + -112;
	r7 = sp + -128;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r7;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r2 = heap32[(r1+2)];
	r5 = r2 >> 2;
	r5 = heap32[(r5+48)];
	r8 = r5 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	r2 = (r2 + 4)|0;
	r9 = sp + -144;
	r10 = sp + -160;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r9;
	heap32[(g0+3)] = r10;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	f1 = heapFloat[(fp+-28)];
	f3 = heapFloat[(fp+-40)];
	if(f1 >f3) //_LBB255_7
{
__label__ = 7;
}
else{
	f1 = heapFloat[(fp+-32)];
	f3 = heapFloat[(fp+-36)];
	if(f1 <f3) //_LBB255_7
{
__label__ = 7;
}
else{
	r2 = 1;
__label__ = 8;
}
}
if (__label__ == 7){
	r2 = 0;
}
	r5 = r6 >> 2;
	r8 = r10 >> 2;
	f1 = heapFloat[(r5+2)];
	f3 = heapFloat[(r8+2)];
	if(f1 >f3) //_LBB255_11
{
__label__ = 10;
}
else{
	r11 = r7 >> 2;
	r12 = r9 >> 2;
	f1 = heapFloat[(r11+2)];
	f3 = heapFloat[(r12+2)];
	if(f1 <f3) //_LBB255_11
{
__label__ = 10;
}
else{
__label__ = 11;
}
}
if (__label__ == 10){
	r2 = 0;
}
	f1 = heapFloat[(r5+1)];
	f3 = heapFloat[(r8+1)];
if(!(f1 >f3)) //_LBB255_24
{
	r5 = r7 >> 2;
	r8 = r9 >> 2;
	f1 = heapFloat[(r5+1)];
	f3 = heapFloat[(r8+1)];
if(!(f1 <f3)) //_LBB255_24
{
	r2 = r2 & 255;
if(!(r2 ==0)) //_LBB255_24
{
	r2 = heap32[(r1+1)];
	r2 = r2 >> 2;
	heap32[(r2+1)] = heap32[(fp+-24)];
	heap32[(r2+2)] = heap32[(r3+1)];
	heap32[(r2+3)] = heap32[(r3+2)];
	heap32[(r2+4)] = heap32[(r3+3)];
	heap32[(r2+5)] = heap32[(r3+4)];
	heap32[(r2+6)] = heap32[(r3+5)];
	heap32[(r2+7)] = heap32[(r3+6)];
	heap32[(r2+8)] = heap32[(r3+7)];
	heap32[(r2+9)] = heap32[(r3+8)];
	heap32[(r2+10)] = heap32[(r3+9)];
	heap32[(r2+11)] = heap32[(r3+10)];
	heap32[(r2+12)] = heap32[(r3+11)];
	heap32[(r2+13)] = heap32[(r3+12)];
	heap32[(r2+14)] = heap32[(r3+13)];
	heap32[(r2+15)] = heap32[(r3+14)];
	heap32[(r2+16)] = heap32[(r3+15)];
	r2 = heap32[(r1+1)];
	r2 = r2 >> 2;
	heap32[(r2+17)] = heap32[(fp+-24)];
	heap32[(r2+18)] = heap32[(r3+1)];
	heap32[(r2+19)] = heap32[(r3+2)];
	heap32[(r2+20)] = heap32[(r3+3)];
	heap32[(r2+21)] = heap32[(r3+4)];
	heap32[(r2+22)] = heap32[(r3+5)];
	heap32[(r2+23)] = heap32[(r3+6)];
	heap32[(r2+24)] = heap32[(r3+7)];
	heap32[(r2+25)] = heap32[(r3+8)];
	heap32[(r2+26)] = heap32[(r3+9)];
	heap32[(r2+27)] = heap32[(r3+10)];
	heap32[(r2+28)] = heap32[(r3+11)];
	heap32[(r2+29)] = heap32[(r3+12)];
	heap32[(r2+30)] = heap32[(r3+13)];
	heap32[(r2+31)] = heap32[(r3+14)];
	heap32[(r2+32)] = heap32[(r3+15)];
	r2 = heap32[(r1+1)];
	r2 = r2 >> 2;
	r3 = heap32[(r2+48)];
	heap32[(r2+48)] = r4;
	r2 = heap32[(r1+6)];
	r4 = r0 << 2;
	r2 = (r2 + r4)|0;
	r2 = r2 >> 2;
	r5 = heap32[(r2)];
if(!(r5 !=0)) //_LBB255_17
{
	r5 = heap32[(r1+3)];
	r8 = r5 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	r11 = heap32[(r1+7)];
	r12 = heap32[(r1+2)];
	r13 = heap32[(r1+1)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r13;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = r11;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	heap32[(r2)] = r_g0;
}
	r2 = heap32[(r1+5)];
	r5 = r2 >> 2;
	r8 = heap32[(r5)];
	r5 = heap32[(r5+34)];
	r11 = heap32[(r1+1)];
	if(r5 !=r11) //_LBB255_19
{
	r5 = r8 >> 2;
	r5 = heap32[(r5+3)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = -1;
	heap32[(g0+2)] = r0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
else{
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = -1;
	heap32[(g0+2)] = r0;
	__FUNCTION_TABLE__[(r8)>>2](i7);
}
	r0 = heap32[(r1+6)];
	r0 = (r0 + r4)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	r2 = r0 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+2)];
	r4 = heap32[(r1+5)];
	r5 = heap32[(r1+4)];
	r8 = heap32[(r1+2)];
	r11 = heap32[(r1+1)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r5;
	heap32[(g0+4)] = r4;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = heap32[(r1+4)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+5)];
if(!(r0 ==0)) //_LBB255_23
{
	r2 = r0 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+12)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = r_g0 & 2;
if(!(r0 ==0)) //_LBB255_23
{
	r0 = heap32[(r1+4)];
	r0 = r0 >> 2;
	r2 = heap32[(r0+5)];
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+13)];
	r4 = sp + -32;
	r5 = r4 >> 2;
	heap32[(fp+-8)] = 1065353216;
	heap32[(r5+1)] = 1065353216;
	heap32[(r5+2)] = 1065353216;
	heap32[(r5+3)] = 0;
	r0 = heap32[(r0+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = heap32[(r1+4)];
	r0 = r0 >> 2;
	r2 = heap32[(r0+5)];
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+13)];
	r4 = sp + -16;
	r5 = r4 >> 2;
	heap32[(fp+-4)] = 1065353216;
	heap32[(r5+1)] = 1065353216;
	heap32[(r5+2)] = 1065353216;
	heap32[(r5+3)] = 0;
	r0 = heap32[(r0+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
}
	r0 = heap32[(r1+1)];
	r0 = r0 >> 2;
	heap32[(r0+48)] = r3;
	r0 = heap32[(r1+1)];
	r0 = r0 >> 2;
	heapFloat[(r0+1)] = f0;
	heapFloat[(r0+2)] = f2;
	heapFloat[(r0+3)] = f6;
	heapFloat[(r0+4)] = f23;
	heapFloat[(r0+5)] = f10;
	heapFloat[(r0+6)] = f11;
	heapFloat[(r0+7)] = f18;
	f0 = heapFloat[(fp+-59)];
	heapFloat[(r0+8)] = f0;
	heapFloat[(r0+9)] = f12;
	heapFloat[(r0+10)] = f15;
	heapFloat[(r0+11)] = f20;
	f0 = heapFloat[(fp+-57)];
	heapFloat[(r0+12)] = f0;
	heapFloat[(r0+13)] = f24;
	heapFloat[(r0+14)] = f25;
	heapFloat[(r0+15)] = f26;
	f0 = heapFloat[(fp+-58)];
	heapFloat[(r0+16)] = f0;
	r0 = heap32[(r1+1)];
	r0 = r0 >> 2;
	f0 = heapFloat[(fp+-42)];
	heapFloat[(r0+17)] = f0;
	f0 = heapFloat[(fp+-41)];
	heapFloat[(r0+18)] = f0;
	f0 = heapFloat[(fp+-44)];
	heapFloat[(r0+19)] = f0;
	f0 = heapFloat[(fp+-43)];
	heapFloat[(r0+20)] = f0;
	f0 = heapFloat[(fp+-46)];
	heapFloat[(r0+21)] = f0;
	f0 = heapFloat[(fp+-45)];
	heapFloat[(r0+22)] = f0;
	f0 = heapFloat[(fp+-48)];
	heapFloat[(r0+23)] = f0;
	f0 = heapFloat[(fp+-47)];
	heapFloat[(r0+24)] = f0;
	f0 = heapFloat[(fp+-50)];
	heapFloat[(r0+25)] = f0;
	f0 = heapFloat[(fp+-49)];
	heapFloat[(r0+26)] = f0;
	f0 = heapFloat[(fp+-52)];
	heapFloat[(r0+27)] = f0;
	f0 = heapFloat[(fp+-51)];
	heapFloat[(r0+28)] = f0;
	f0 = heapFloat[(fp+-54)];
	heapFloat[(r0+29)] = f0;
	f0 = heapFloat[(fp+-53)];
	heapFloat[(r0+30)] = f0;
	f0 = heapFloat[(fp+-56)];
	heapFloat[(r0+31)] = f0;
	f0 = heapFloat[(fp+-55)];
	heapFloat[(r0+32)] = f0;
}
}
}
	return;
}
else{
	r0 = _2E_str7106;
	r1 = _2E_str1100;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 119;
	_assert(i7);
}
}
else{
	r0 = _2E_str6105;
	r1 = _2E_str1100;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 117;
	_assert(i7);
}
}