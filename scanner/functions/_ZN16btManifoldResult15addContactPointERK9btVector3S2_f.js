function _ZN16btManifoldResult15addContactPointERK9btVector3S2_f(sp)
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
	i7 = sp + -304;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+1)];
	if(r1 !=0) //_LBB352_2
{
	f0 = heapFloat[(fp+3)];
	r2 = r1 >> 2;
	f1 = heapFloat[(r2+280)];
if(!(f1 <f0)) //_LBB352_53
{
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r3 = r3 >> 2;
	r4 = r4 >> 2;
	f1 = heapFloat[(r3+2)];
	heapFloat[(fp+-71)] = f1;
	f2 = heapFloat[(r3+1)];
	f3 = heapFloat[(r3)];
	f4 = heapFloat[(r4+2)];
	f1 = f1*f0;
	f5 = heapFloat[(r4+1)];
	f6 = f2*f0;
	f7 = heapFloat[(r4)];
	f8 = f3*f0;
	r5 = heap32[(r2+277)];
	r6 = heap32[(r0+34)];
	f1 = f4+f1;
	f6 = f5+f6;
	f8 = f7+f8;
	if(r5 ==r6) //_LBB352_5
{
	f9 = heapFloat[(r0+14)];
	f10 = heapFloat[(r0+15)];
	f11 = heapFloat[(r0+30)];
	f13 = heapFloat[(r0+31)];
	f14 = heapFloat[(r0+4)];
	f9 = f8-f9;
	f15 = heapFloat[(r0+3)];
	f12 = heapFloat[(r0+2)];
	f16 = heapFloat[(r0+8)];
	f10 = f6-f10;
	f17 = heapFloat[(r0+7)];
	f18 = heapFloat[(r0+6)];
	f19 = heapFloat[(r0+16)];
	f20 = heapFloat[(r0+20)];
	f11 = f7-f11;
	f21 = heapFloat[(r0+19)];
	f22 = heapFloat[(r0+18)];
	f23 = heapFloat[(r0+24)];
	f13 = f5-f13;
	f24 = heapFloat[(r0+23)];
	f25 = heapFloat[(r0+22)];
	f26 = heapFloat[(r0+32)];
	f14 = f14*f9;
	f16 = f16*f10;
	f27 = heapFloat[(r0+12)];
	f19 = f1-f19;
	f28 = heapFloat[(r0+11)];
	f29 = heapFloat[(r0+10)];
	f15 = f15*f9;
	f17 = f17*f10;
	f9 = f12*f9;
	f10 = f18*f10;
	f12 = f20*f11;
	f18 = f23*f13;
	f20 = heapFloat[(r0+28)];
	f23 = f4-f26;
	f26 = heapFloat[(r0+27)];
	f30 = heapFloat[(r0+26)];
	f21 = f21*f11;
	f24 = f24*f13;
	f11 = f22*f11;
	f13 = f25*f13;
	f14 = f14+f16;
	f16 = f27*f19;
	f15 = f15+f17;
	f17 = f28*f19;
	f9 = f9+f10;
	f10 = f29*f19;
	f12 = f12+f18;
	f18 = f20*f23;
	f19 = f21+f24;
	f20 = f26*f23;
	f11 = f11+f13;
	f21 = f30*f23;
	f13 = f14+f16;
	f14 = f15+f17;
	f9 = f9+f10;
	f10 = f12+f18;
	f15 = f19+f20;
	f11 = f11+f21;
}
else{
	f9 = heapFloat[(r0+30)];
	f10 = heapFloat[(r0+31)];
	f11 = heapFloat[(r0+14)];
	f12 = heapFloat[(r0+15)];
	f13 = heapFloat[(r0+20)];
	f9 = f8-f9;
	f14 = heapFloat[(r0+19)];
	f15 = heapFloat[(r0+18)];
	f16 = heapFloat[(r0+24)];
	f10 = f6-f10;
	f17 = heapFloat[(r0+23)];
	f18 = heapFloat[(r0+22)];
	f19 = heapFloat[(r0+32)];
	f20 = heapFloat[(r0+4)];
	f11 = f7-f11;
	f21 = heapFloat[(r0+3)];
	f22 = heapFloat[(r0+2)];
	f23 = heapFloat[(r0+8)];
	f12 = f5-f12;
	f24 = heapFloat[(r0+7)];
	f25 = heapFloat[(r0+6)];
	f26 = heapFloat[(r0+16)];
	f13 = f13*f9;
	f16 = f16*f10;
	f27 = heapFloat[(r0+28)];
	f19 = f1-f19;
	f28 = heapFloat[(r0+27)];
	f29 = heapFloat[(r0+26)];
	f14 = f14*f9;
	f17 = f17*f10;
	f9 = f15*f9;
	f10 = f18*f10;
	f15 = f20*f11;
	f18 = f23*f12;
	f20 = heapFloat[(r0+12)];
	f23 = f4-f26;
	f26 = heapFloat[(r0+11)];
	f30 = heapFloat[(r0+10)];
	f21 = f21*f11;
	f24 = f24*f12;
	f11 = f22*f11;
	f12 = f25*f12;
	f13 = f13+f16;
	f16 = f27*f19;
	f14 = f14+f17;
	f17 = f28*f19;
	f9 = f9+f10;
	f10 = f29*f19;
	f15 = f15+f18;
	f18 = f20*f23;
	f19 = f21+f24;
	f20 = f26*f23;
	f11 = f11+f12;
	f12 = f30*f23;
	f13 = f13+f16;
	f14 = f14+f17;
	f9 = f9+f10;
	f10 = f15+f18;
	f15 = f19+f20;
	f11 = f11+f12;
}
	r7 = sp + -280;
	r8 = r7 >> 2;
	heapFloat[(fp+-70)] = f9;
	heapFloat[(r8+1)] = f14;
	heapFloat[(r8+2)] = f13;
	heap32[(r8+3)] = 0;
	heapFloat[(r8+4)] = f11;
	heapFloat[(r8+5)] = f15;
	heapFloat[(r8+6)] = f10;
	heap32[(r8+7)] = 0;
	heapFloat[(r8+16)] = f3;
	heapFloat[(r8+17)] = f2;
	f2 = heapFloat[(fp+-71)];
	heapFloat[(r8+18)] = f2;
	heap32[(r8+19)] = heap32[(r3+3)];
	heapFloat[(r8+20)] = f0;
	heap32[(r8+21)] = 0;
	heap32[(r8+22)] = 0;
	heap32[(r8+27)] = 0;
	r3 = 0;
	heap32[(r8+28)] = 0;
	heap8[sp+-164] = r3;
	heap32[(r8+30)] = 0;
	heap32[(r8+31)] = 0;
	heap32[(r8+32)] = 0;
	heap32[(r8+33)] = 0;
	heap32[(r8+34)] = 0;
	heap32[(r8+35)] = 0;
	heap32[(r8+36)] = 0;
	heap32[(r8+52)] = 0;
	heap32[(r8+60)] = 0;
	heap32[(r8+68)] = 0;
	heapFloat[(r8+12)] = f8;
	heapFloat[(r8+13)] = f6;
	heapFloat[(r8+14)] = f1;
	heap32[(r8+15)] = 0;
	heapFloat[(r8+8)] = f7;
	heapFloat[(r8+9)] = f5;
	heapFloat[(r8+10)] = f4;
	heap32[(r8+11)] = heap32[(r4+3)];
	r4 = heap32[(r2+279)];
_9: do {
	if(r4 >0) //_LBB352_8
{
	f1 = heapFloat[(r2+280)];
	f1 = f1*f1;
	r10 = 0;
	r9 = -1;
_11: while(true){
	r11 = (r10 * 69)|0;
	r11 = r11 << 2;
	r11 = (r1 + r11)|0;
	r11 = r11 >> 2;
	f2 = heapFloat[(r11+1)];
	f3 = heapFloat[(r11+2)];
	f2 = f2-f9;
	f3 = f3-f14;
	f4 = heapFloat[(r11+3)];
	f4 = f4-f13;
	f2 = f2*f2;
	f3 = f3*f3;
	f2 = f2+f3;
	f3 = f4*f4;
	f2 = f2+f3;
	r11 = (r10 + 1)|0;
	r9 = f2 < f1 ? r10 : r9;
	f1 = f2 < f1 ? f2 : f1;
	r10 = r11;
if(!(r4 !=r11)) //_LBB352_9
{
break _9;
}
}
}
else{
	r9 = -1;
}
} while(0);
	r4 = heap32[(r0+35)];
	r4 = r4 >> 2;
	r10 = r6 >> 2;
	f1 = heapFloat[(r10+56)];
	f2 = heapFloat[(r4+56)];
	f1 = f1*f2;
	f2 =                       -10;
	f1 = f1 < f2 ? f2 : f1;
	f2 =                        10;
	f1 = f1 > f2 ? f2 : f1;
	heapFloat[(r8+21)] = f1;
	f1 = heapFloat[(r10+57)];
	f2 = heapFloat[(r4+57)];
	f1 = f1*f2;
	heapFloat[(r8+22)] = f1;
	if(r5 ==r6) //_LBB352_12
{
	r4 = heap32[(r0+36)];
	heap32[(r8+23)] = r4;
	r4 = heap32[(r0+37)];
	heap32[(r8+24)] = r4;
	r4 = heap32[(r0+38)];
	heap32[(r8+25)] = r4;
	r0 = heap32[(r0+39)];
	heap32[(r8+26)] = r0;
}
else{
	r4 = heap32[(r0+37)];
	heap32[(r8+23)] = r4;
	r4 = heap32[(r0+36)];
	heap32[(r8+24)] = r4;
	r4 = heap32[(r0+39)];
	heap32[(r8+25)] = r4;
	r0 = heap32[(r0+38)];
	heap32[(r8+26)] = r0;
}
	f1 = heapFloat[(r2+280)];
	if(r9 <0) //_LBB352_19
{
	if(f1 >=f0) //_LBB352_21
{
	r0 = heap32[(r2+279)];
	if(r0 !=4) //_LBB352_49
{
	r4 = (r0 + 1)|0;
	heap32[(r2+279)] = r4;
}
else{
	f1 = heapFloat[(r2+21)];
	r0 = -1;
	f2 = heapFloat[(r2+90)];
	f3 = f1 < f0 ? f1 : f0;
	r4 = 1;
	f4 = heapFloat[(r2+159)];
	f5 = f2 < f3 ? f2 : f3;
	r5 = 2;
	f6 = heapFloat[(r2+228)];
	f7 = f4 < f5 ? f4 : f5;
	if(f6 >=f7) //_LBB352_24
{
	r6 = f1 >= f0 ? r0 : r3;
	r6 = f2 < f3 ? r4 : r6;
	r6 = f4 < f5 ? r5 : r6;
	if(r6 ==0) //_LBB352_26
{
	f0 = heapFloat[(r2+210)];
	f1 = heapFloat[(r2+141)];
	f2 = heapFloat[(r2+209)];
	f3 = heapFloat[(r2+140)];
	f4 = heapFloat[(r2+208)];
	f5 = heapFloat[(r2+139)];
	f6 = heapFloat[(r2+72)];
	f7 = heapFloat[(r2+71)];
	f8 = heapFloat[(r2+70)];
	f10 =                         0;
	r6 = r3;
__label__ = 28;
}
else{
__label__ = 26;
}
}
else{
	r6 = 3;
__label__ = 26;
}
if (__label__ == 26){
	f6 = heapFloat[(r2+72)];
	f0 = heapFloat[(r2+210)];
	f1 = heapFloat[(r2+141)];
	f8 = heapFloat[(r2+70)];
	f2 = heapFloat[(r2+209)];
	f3 = heapFloat[(r2+140)];
	f7 = heapFloat[(r2+71)];
	f4 = heapFloat[(r2+208)];
	f5 = heapFloat[(r2+139)];
	f10 = f13-f6;
	f11 = f2-f3;
	f12 = f9-f8;
	f15 = f0-f1;
	f16 = f14-f7;
	f17 = f4-f5;
	f18 = f16*f15;
	f19 = f10*f11;
	f10 = f10*f17;
	f15 = f12*f15;
	f18 = f18-f19;
	f10 = f10-f15;
	f11 = f12*f11;
	f12 = f16*f17;
	f11 = f11-f12;
	f12 = f18*f18;
	f10 = f10*f10;
	f10 = f12+f10;
	f11 = f11*f11;
	f10 = f10+f11;
	if(r6 ==1) //_LBB352_29
{
	f11 = heapFloat[(r2+3)];
	f12 = heapFloat[(r2+2)];
	f15 = heapFloat[(r2+1)];
	f16 =                         0;
	r6 = r4;
__label__ = 30;
}
else{
__label__ = 28;
}
}
if (__label__ == 28){
	f11 = heapFloat[(r2+3)];
	f15 = heapFloat[(r2+1)];
	f12 = heapFloat[(r2+2)];
	f16 = f13-f11;
	f17 = f2-f3;
	f18 = f9-f15;
	f19 = f0-f1;
	f20 = f14-f12;
	f21 = f4-f5;
	f22 = f20*f19;
	f23 = f16*f17;
	f16 = f16*f21;
	f19 = f18*f19;
	f22 = f22-f23;
	f16 = f16-f19;
	f17 = f18*f17;
	f18 = f20*f21;
	f17 = f17-f18;
	f18 = f22*f22;
	f16 = f16*f16;
	f16 = f18+f16;
	f17 = f17*f17;
	f16 = f16+f17;
	if(r6 ==2) //_LBB352_32
{
	f0 =                         0;
__label__ = 32;
}
else{
__label__ = 30;
}
}
if (__label__ == 30){
	f17 = f13-f11;
	f2 = f2-f7;
	f18 = f9-f15;
	f0 = f0-f6;
	f19 = f14-f12;
	f4 = f4-f8;
	f20 = f19*f0;
	f21 = f17*f2;
	f17 = f17*f4;
	f0 = f18*f0;
	f20 = f20-f21;
	f0 = f17-f0;
	f2 = f18*f2;
	f4 = f19*f4;
	f2 = f2-f4;
	f4 = f20*f20;
	f0 = f0*f0;
	f0 = f4+f0;
	f2 = f2*f2;
	f0 = f0+f2;
	if(r6 ==3) //_LBB352_35
{
	f1 =                         0;
__label__ = 34;
}
else{
__label__ = 32;
}
}
if (__label__ == 32){
	f2 = f13-f11;
	f3 = f3-f7;
	f4 = f9-f15;
	f1 = f1-f6;
	f6 = f14-f12;
	f5 = f5-f8;
	f7 = f6*f1;
	f8 = f2*f3;
	f2 = f2*f5;
	f1 = f4*f1;
	f7 = f7-f8;
	f1 = f2-f1;
	f2 = f4*f3;
	f3 = f6*f5;
	f2 = f2-f3;
	f3 = f7*f7;
	f1 = f1*f1;
	f1 = f3+f1;
	f2 = f2*f2;
	f1 = f1+f2;
	f2 =                         0;
	if(f1 <f2) //_LBB352_38
{
	f1 = -f1;
}
}
	f2 =                         0;
	if(f0 <f2) //_LBB352_41
{
	f0 = -f0;
}
	if(f16 <f2) //_LBB352_44
{
	f16 = -f16;
}
	if(f10 <f2) //_LBB352_47
{
	f10 = -f10;
}
	f2 =       -999999984306749440;
	r2 = 0;
	f3 = f10 > f2 ? f10 : f2;
	r0 = f10 <= f2 ? r0 : r2;
	f2 = f16 > f3 ? f16 : f3;
	r0 = f16 > f3 ? r4 : r0;
	f3 = f0 > f2 ? f0 : f2;
	r2 = 3;
	r0 = f0 > f2 ? r5 : r0;
	r0 = f1 > f3 ? r2 : r0;
}
	r0 = r0 < 0 ? r3 : r0;
	r0 = (r0 * 276)|0;
	r0 = (r1 + r0)|0;
	r1 = r0 >> 2;
	r1 = heap32[(r1+28)];
	if(r1 ==0) //_LBB352_52
{
	r0 = (r0 + 4)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = 276;
	memcpy(i7);
}
else{
	r0 = _2E_str4438;
	r7 = _2E_str3437;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = 190;
	_assert(i7);
}
}
else{
	r1 = _2E_str2149;
	r2 = _2E_str3437;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 168;
	_assert(i7);
}
}
else{
	if(f1 >=f0) //_LBB352_16
{
	r2 = (r9 * 276)|0;
	r1 = (r1 + r2)|0;
	r2 = r1 >> 2;
	r3 = heap32[(r2+37)];
	if(r3 >-1) //_LBB352_18
{
	f0 = heapFloat[(r2+53)];
	f1 = heapFloat[(r2+61)];
	f9 = heapFloat[(r2+69)];
	r0 = heap32[(r2+28)];
	r1 = (r1 + 4)|0;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = 276;
	memcpy(i7);
	heap32[(r2+28)] = r0;
	heapFloat[(r2+29)] = f0;
	heapFloat[(r2+31)] = f1;
	heapFloat[(r2+32)] = f9;
	heapFloat[(r2+53)] = f0;
	heapFloat[(r2+61)] = f1;
	heapFloat[(r2+69)] = f9;
	heap32[(r2+37)] = r3;
	return;
}
else{
	r1 = _2E_str3150;
	r2 = _2E_str483;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 177;
	_assert(i7);
}
}
else{
	r1 = _2E_str2149;
	r2 = _2E_str483;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 165;
	_assert(i7);
}
}
}
	return;
}
else{
	r0 = _2E_str59;
	r1 = _2E_str5152;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 64;
	_assert(i7);
}
}