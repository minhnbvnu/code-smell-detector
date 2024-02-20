function _ZN22SphereTriangleDetector16getClosestPointsERKN36btDiscreteCollisionDetectorInterface17ClosestPointInputERNS0_6ResultEP12btIDebugDrawb(sp)
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
	i7 = sp + -144;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2)];
	r1 = r1 >> 2;
	f0 = heapFloat[(r1+19)];
	f1 = heapFloat[(r1+15)];
	f2 = heapFloat[(r1+23)];
	f3 = heapFloat[(r1+17)];
	f4 = heapFloat[(r1+13)];
	f5 = heapFloat[(r1+21)];
	f6 = heapFloat[(r1+22)];
	f7 = heapFloat[(r1+14)];
	f8 = heapFloat[(r1+18)];
	f0 = f0-f1;
	f6 = f6-f7;
	f3 = f3-f4;
	f1 = f2-f1;
	f2 = f8-f7;
	f4 = f5-f4;
	r2 = heap32[(fp+1)];
	r3 = heap32[(r0+1)];
	f5 = f2*f1;
	f7 = f0*f6;
	f0 = f0*f4;
	f1 = f3*f1;
	r2 = r2 >> 2;
	r3 = r3 >> 2;
	f5 = f5-f7;
	f0 = f0-f1;
	f1 = f3*f6;
	f2 = f2*f4;
	f3 = heapFloat[(r0+3)];
	f1 = f1-f2;
	f2 = f5*f5;
	f4 = f0*f0;
	f6 = heapFloat[(r3+7)];
	f7 = heapFloat[(r3+3)];
	f8 = heapFloat[(r2+18)];
	f9 = heapFloat[(r2+22)];
	f10 = heapFloat[(r2+26)];
	f11 = heapFloat[(r2+17)];
	f12 = heapFloat[(r2+21)];
	f13 = heapFloat[(r2+25)];
	f14 = heapFloat[(r2+16)];
	f15 = heapFloat[(r2+12)];
	f16 = heapFloat[(r2+28)];
	f17 = heapFloat[(r2+20)];
	f18 = heapFloat[(r2+13)];
	f19 = heapFloat[(r2+29)];
	f20 = heapFloat[(r2+24)];
	f21 = heapFloat[(r2+14)];
	f22 = heapFloat[(r2+30)];
	f2 = f2+f4;
	f4 = f1*f1;
	f15 = f15-f16;
	f16 = f18-f19;
	f2 = f2+f4;
	f4 = f21-f22;
	heapFloat[(g0)] = f2;
	f2 = f11*f15;
	f11 = f12*f16;
	f12 = f14*f15;
	f14 = f17*f16;
	sqrtf(i7);
	f18 =                         1;
	heapFloat[(fp+-25)] = f18;
	f8 = f8*f15;
	f9 = f9*f16;
	f2 = f2+f11;
	f11 = f13*f4;
	f12 = f12+f14;
	f13 = f20*f4;
	f14 = f18/f_g0;
	f2 = f2+f11;
	f11 = heapFloat[(r1+14)];
	f12 = f12+f13;
	f13 = heapFloat[(r1+13)];
	f8 = f8+f9;
	f4 = f10*f4;
	f5 = f5*f14;
	f9 = f12-f13;
	heapFloat[(fp+-28)] = f9;
	f0 = f0*f14;
	f10 = f2-f11;
	heapFloat[(fp+-29)] = f10;
	f4 = f8+f4;
	f8 = heapFloat[(r1+15)];
	f1 = f1*f14;
	f14 = f4-f8;
	heapFloat[(fp+-27)] = f14;
	f9 = f9*f5;
	f10 = f10*f0;
	f9 = f9+f10;
	f10 = f14*f1;
	f9 = f9+f10;
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+4)];
	f6 = f6*f7;
	heapFloat[(fp+-26)] = f6;
	f6 =                         0;
	if(f9 <f6) //_LBB371_2
{
	f9 = -f9;
	f5 = -f5;
	f0 = -f0;
	f1 = -f1;
}
	f7 = heapFloat[(fp+-26)];
	if(f9 <f7) //_LBB371_5
{
__label__ = 4;
}
else{
	f7 = f5*f6;
	f10 = f0*f6;
	f7 = f7+f10;
	f10 = f1*f6;
	f7 = f7+f10;
	if(f7 >=f6) //_LBB371_31
{
__label__ = 29;
}
else{
__label__ = 4;
}
}
_6: do {
if (__label__ == 4){
	f7 = heapFloat[(fp+-26)];
	f3 = f7+f3;
	heapFloat[(fp+-30)] = f3;
if(!(f3 <=f9)) //_LBB371_31
{
	f3 = heapFloat[(r1+19)];
	f7 = heapFloat[(r1+23)];
	f10 = heapFloat[(r1+17)];
	f14 = heapFloat[(r1+21)];
	f15 = heapFloat[(r1+18)];
	f16 = heapFloat[(r1+22)];
	f17 = f7-f3;
	f18 = f14-f10;
	f19 = f3-f8;
	f8 = f8-f7;
	f20 = f16-f15;
	f21 = f10-f13;
	f22 = f15-f11;
	f13 = f13-f14;
	f11 = f11-f16;
	f23 = f20*f1;
	f24 = f17*f0;
	f17 = f17*f5;
	f25 = f18*f1;
	f26 = f22*f1;
	f27 = f19*f0;
	f19 = f19*f5;
	f28 = f21*f1;
	f29 = f11*f1;
	f30 = f8*f0;
	f8 = f8*f5;
	heapFloat[(fp+-31)] = f8;
	f8 = f13*f1;
	f23 = f23-f24;
	f10 = f12-f10;
	f17 = f17-f25;
	f15 = f2-f15;
	f18 = f18*f0;
	f20 = f20*f5;
	f24 = f26-f27;
	f19 = f19-f28;
	f21 = f21*f0;
	f22 = f22*f5;
	f25 = f29-f30;
	f14 = f12-f14;
	f26 = heapFloat[(fp+-31)];
	f8 = f26-f8;
	f16 = f2-f16;
	f13 = f13*f0;
	f11 = f11*f5;
	f10 = f23*f10;
	f15 = f17*f15;
	f17 = f18-f20;
	f3 = f4-f3;
	f18 = heapFloat[(fp+-28)];
	f18 = f24*f18;
	f20 = heapFloat[(fp+-29)];
	f19 = f19*f20;
	f20 = f21-f22;
	f14 = f25*f14;
	f8 = f8*f16;
	f11 = f13-f11;
	f7 = f4-f7;
	f10 = f10+f15;
	f3 = f17*f3;
	f13 = f18+f19;
	f15 = heapFloat[(fp+-27)];
	f15 = f20*f15;
	f8 = f14+f8;
	f7 = f11*f7;
	f3 = f10+f3;
	f10 = f13+f15;
	f7 = f8+f7;
	if(f3 <=f6) //_LBB371_9
{
__label__ = 8;
}
else{
	f8 =                         0;
	if(f10 <=f8) //_LBB371_9
{
__label__ = 8;
}
else{
	if(f7 >f8) //_LBB371_12
{
__label__ = 11;
}
else{
__label__ = 8;
}
}
}
_12: do {
if (__label__ == 8){
if(!(f10 >f6)) //_LBB371_13
{
if(!(f3 >f6)) //_LBB371_13
{
if(!(f7 >f6)) //_LBB371_13
{
__label__ = 11;
break _12;
}
}
}
	r1 = heap32[(r0+2)];
	r5 = r1 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+22)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r1 = r_g0;
	if(r1 <1) //_LBB371_31
{
break _6;
}
else{
	f0 = heapFloat[(fp+-30)];
	f5 = f0*f0;
	r1 = 0;
	r5 = r1;
_19: while(true){
	r6 = heap32[(r0+2)];
	r7 = r6 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+23)];
	r8 = sp + -32;
	r9 = sp + -16;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r9;
	heap32[(g0+3)] = r8;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r6 = r8 >> 2;
	r7 = r9 >> 2;
	f7 = heapFloat[(r7+1)];
	f8 = heapFloat[(r6+1)];
	f9 = heapFloat[(fp+-4)];
	f10 = heapFloat[(fp+-8)];
	f11 = f2-f7;
	f8 = f8-f7;
	f13 = f12-f9;
	f10 = f10-f9;
	f14 = heapFloat[(r7+2)];
	f15 = heapFloat[(r6+2)];
	f16 = f4-f14;
	f15 = f15-f14;
	f17 = f10*f13;
	f18 = f8*f11;
	f17 = f17+f18;
	f18 = f15*f16;
	f17 = f17+f18;
	r1 = (r1 + 1)|0;
	if(f17 >f6) //_LBB371_17
{
	f18 = f10*f10;
	f19 = f8*f8;
	f18 = f18+f19;
	f19 = f15*f15;
	f18 = f18+f19;
	if(f17 >=f18) //_LBB371_19
{
	f13 = f13-f10;
	f11 = f11-f8;
	f16 = f16-f15;
	f17 = heapFloat[(fp+-25)];
}
else{
	f17 = f17/f18;
	f18 = f10*f17;
	f19 = f8*f17;
	f20 = f15*f17;
	f13 = f13-f18;
	f11 = f11-f19;
	f16 = f16-f20;
}
}
else{
	f17 = f6;
}
	f13 = f13*f13;
	f11 = f11*f11;
	f11 = f13+f11;
	f13 = f16*f16;
	f11 = f11+f13;
	if(f11 <f5) //_LBB371_22
{
	f0 = f10*f17;
	f3 = f8*f17;
	f8 = f15*f17;
	f1 = f9+f0;
	f0 = f7+f3;
	f3 = f14+f8;
	r5 = 1;
}
	r6 = heap32[(r0+2)];
	r7 = r6 >> 2;
	r7 = heap32[(r7)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+22)];
	heap32[(g0)] = r6;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r6 = r_g0;
if(!(r6 >r1)) //_LBB371_15
{
break _19;
}
}
	r0 = r5 & 255;
	if(r0 ==0) //_LBB371_31
{
break _6;
}
else{
__label__ = 23;
}
}
}
} while(0);
if (__label__ == 11){
	f6 = f1*f9;
	f0 = f0*f9;
	f1 = f5*f9;
	f3 = f4-f6;
	f0 = f2-f0;
	f1 = f12-f1;
}
	f2 = f2-f0;
	f5 = f12-f1;
	f4 = f4-f3;
	f6 = f5*f5;
	f7 = f2*f2;
	f6 = f6+f7;
	f7 = f4*f4;
	f6 = f6+f7;
	f7 = heapFloat[(fp+-26)];
	f7 = f7*f7;
	if(f7 <=f6) //_LBB371_27
{
	f6 =                         0;
	f5 = f5*f6;
	f2 = f2*f6;
	f2 = f5+f2;
	f4 = f4*f6;
	f2 = f2+f4;
	if(f2 >=f6) //_LBB371_31
{
break _6;
}
}
else{
	heapFloat[(g0)] = f6;
	sqrtf(i7);
	f7 = f_g0;
	heapFloat[(g0)] = f6;
	f6 =                         1;
	sqrtf(i7);
	f9 = heapFloat[(fp+-26)];
	f7 = f9-f7;
	f6 = f6/f_g0;
	f5 = f5*f6;
	f2 = f2*f6;
	f4 = f4*f6;
	f6 = -f7;
}
	if(r4 ==0) //_LBB371_30
{
	r0 = r3 >> 2;
	f7 = heapFloat[(r2+16)];
	f8 = heapFloat[(r2+17)];
	r0 = heap32[(r0)];
	f9 = heapFloat[(r2+20)];
	f10 = heapFloat[(r2+21)];
	f11 = f7*f1;
	f12 = f8*f0;
	f13 = heapFloat[(r2+18)];
	r0 = r0 >> 2;
	f14 = heapFloat[(r2+24)];
	f15 = heapFloat[(r2+25)];
	f16 = heapFloat[(r2+22)];
	f17 = f9*f1;
	f18 = f10*f0;
	f11 = f11+f12;
	f12 = f13*f3;
	f19 = heapFloat[(r2+26)];
	r0 = heap32[(r0+4)];
	f1 = f14*f1;
	f0 = f15*f0;
	f17 = f17+f18;
	f18 = f16*f3;
	f11 = f11+f12;
	f12 = heapFloat[(r2+28)];
	f20 = heapFloat[(r2+30)];
	f21 = heapFloat[(r2+29)];
	r1 = sp + -64;
	f17 = f17+f18;
	f0 = f1+f0;
	f1 = f19*f3;
	f3 = f11+f12;
	f0 = f0+f1;
	r2 = r1 >> 2;
	f1 = f17+f21;
	heapFloat[(fp+-16)] = f3;
	f3 = f7*f5;
	f7 = f8*f2;
	f0 = f0+f20;
	heapFloat[(r2+1)] = f1;
	heapFloat[(r2+2)] = f0;
	f0 = f9*f5;
	f1 = f10*f2;
	f3 = f3+f7;
	f7 = f13*f4;
	r4 = sp + -48;
	f5 = f14*f5;
	f2 = f15*f2;
	f0 = f0+f1;
	f1 = f16*f4;
	f3 = f3+f7;
	heap32[(r2+3)] = 0;
	r2 = r4 >> 2;
	f2 = f5+f2;
	f4 = f19*f4;
	f0 = f0+f1;
	heapFloat[(fp+-12)] = f3;
	f1 = f2+f4;
	heapFloat[(r2+1)] = f0;
	heapFloat[(r2+2)] = f1;
	heap32[(r2+3)] = 0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	heapFloat[(g0+3)] = f6;
	__FUNCTION_TABLE__[(r0)>>2](i7);
}
else{
	f7 = heapFloat[(r2+16)];
	f8 = heapFloat[(r2+17)];
	f9 = heapFloat[(r2+20)];
	f10 = heapFloat[(r2+21)];
	f11 = f7*f5;
	f12 = f8*f2;
	f13 = heapFloat[(r2+18)];
	f14 = heapFloat[(r2+24)];
	f15 = heapFloat[(r2+25)];
	f16 = heapFloat[(r2+22)];
	f17 = f9*f5;
	f18 = f10*f2;
	f11 = f11+f12;
	f12 = f13*f4;
	f19 = heapFloat[(r2+26)];
	f11 = f11+f12;
	f5 = f14*f5;
	f2 = f15*f2;
	f12 = f17+f18;
	f17 = f16*f4;
	r0 = sp + -80;
	f12 = f12+f17;
	f2 = f5+f2;
	f4 = f19*f4;
	f5 = -f11;
	f2 = f2+f4;
	r1 = r0 >> 2;
	f4 = -f12;
	heapFloat[(fp+-20)] = f5;
	f5 = -f2;
	heapFloat[(r1+1)] = f4;
	heapFloat[(r1+2)] = f5;
	f4 = f7*f1;
	f5 = f8*f0;
	heap32[(r1+3)] = 0;
	f7 = f9*f1;
	f8 = f10*f0;
	f4 = f4+f5;
	f5 = f13*f3;
	f1 = f14*f1;
	f0 = f15*f0;
	f7 = f7+f8;
	f8 = f16*f3;
	f4 = f4+f5;
	f5 = heapFloat[(r2+28)];
	f0 = f1+f0;
	f1 = f19*f3;
	f3 = f7+f8;
	f7 = heapFloat[(r2+29)];
	f8 = heapFloat[(r2+30)];
	f4 = f4+f5;
	f5 = f11*f6;
	r2 = sp + -96;
	f0 = f0+f1;
	f1 = f3+f7;
	f3 = f12*f6;
	f4 = f4+f5;
	r1 = r2 >> 2;
	f0 = f0+f8;
	f2 = f2*f6;
	f1 = f1+f3;
	heapFloat[(fp+-24)] = f4;
	f0 = f0+f2;
	heapFloat[(r1+1)] = f1;
	heapFloat[(r1+2)] = f0;
	r4 = r3 >> 2;
	heap32[(r1+3)] = 0;
	r1 = heap32[(r4)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	heapFloat[(g0+3)] = f6;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	return;
}
}
}
} while(0);
	return;
}