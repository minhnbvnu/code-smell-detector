function _ZN28btCompoundCollisionAlgorithm21calculateTimeOfImpactEP17btCollisionObjectS1_RK16btDispatcherInfoP16btManifoldResult(sp)
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
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+28];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = r1 == 0 ? r2 : r3;
	r5 = r4 >> 2;
	r6 = heap32[(r5+48)];
	r7 = r6 >> 2;
	r8 = heap32[(r7+1)];
	if(r8 ==31) //_LBB253_2
{
	r0 = r0 >> 2;
	r8 = heap32[(r0+3)];
_3: do {
	if(r8 >0) //_LBB253_4
{
	r9 = heap32[(fp+3)];
	r10 = heap32[(fp+4)];
	r1 = r1 == 0 ? r3 : r2;
	r2 = 0;
	f0 =                         1;
_5: while(true){
	r3 = (r2 * 20)|0;
	r11 = heap32[(r7+6)];
	r3 = r3 << 2;
	r3 = (r11 + r3)|0;
	r3 = r3 >> 2;
	f1 = heapFloat[(r3)];
	f2 = heapFloat[(r5+1)];
	f3 = heapFloat[(r3+4)];
	f4 = heapFloat[(r5+2)];
	f5 = heapFloat[(r3+1)];
	f6 = heapFloat[(r3+5)];
	f7 = f1*f2;
	f8 = f3*f4;
	f9 = heapFloat[(r3+8)];
	f10 = heapFloat[(r5+3)];
	f11 = heapFloat[(r5+10)];
	f12 = heapFloat[(r3+13)];
	f13 = heapFloat[(r5+6)];
	f14 = heapFloat[(r3+6)];
	f15 = heapFloat[(r5+9)];
	f16 = heapFloat[(r3+12)];
	f17 = heapFloat[(r5+5)];
	f18 = heapFloat[(r3+2)];
	f19 = heapFloat[(r3+14)];
	f20 = heapFloat[(r5+11)];
	f21 = heapFloat[(r3+10)];
	f22 = heapFloat[(r5+7)];
	f23 = heapFloat[(r3+9)];
	r3 = heap32[(r3+16)];
	f24 = f5*f2;
	f25 = f6*f4;
	f7 = f7+f8;
	f8 = f9*f10;
	f26 = heapFloat[(r5+16)];
	heapFloat[(fp+-1)] = f26;
	f27 = heapFloat[(r5+15)];
	f28 = heapFloat[(r5+14)];
	f29 = heapFloat[(r5+13)];
	f26 = heapFloat[(r5+12)];
	heapFloat[(fp+-2)] = f26;
	f26 = heapFloat[(r5+8)];
	heapFloat[(fp+-3)] = f26;
	f26 = heapFloat[(r5+4)];
	heapFloat[(fp+-4)] = f26;
	f30 = f18*f2;
	f26 = f14*f4;
	f24 = f24+f25;
	f25 = f23*f10;
	f7 = f7+f8;
	f8 = f30+f26;
	f26 = f21*f10;
	f24 = f24+f25;
	heapFloat[(r5+1)] = f7;
	f7 = f1*f17;
	f25 = f3*f13;
	f8 = f8+f26;
	heapFloat[(r5+2)] = f24;
	heapFloat[(r5+3)] = f8;
	f8 = f5*f17;
	f24 = f6*f13;
	f7 = f7+f25;
	f25 = f9*f22;
	f26 = f18*f17;
	f30 = f14*f13;
	f8 = f8+f24;
	f24 = f23*f22;
	f7 = f7+f25;
	heap32[(r5+4)] = 0;
	f25 = f26+f30;
	f26 = f21*f22;
	f8 = f8+f24;
	heapFloat[(r5+5)] = f7;
	f1 = f1*f15;
	f3 = f3*f11;
	f7 = f25+f26;
	heapFloat[(r5+6)] = f8;
	heapFloat[(r5+7)] = f7;
	f5 = f5*f15;
	f6 = f6*f11;
	f1 = f1+f3;
	f3 = f9*f20;
	f7 = f18*f15;
	f8 = f14*f11;
	f5 = f5+f6;
	f6 = f23*f20;
	f1 = f1+f3;
	heap32[(r5+8)] = 0;
	f3 = f2*f16;
	f9 = f4*f12;
	f7 = f7+f8;
	f8 = f21*f20;
	f5 = f5+f6;
	heapFloat[(r5+9)] = f1;
	f1 = f17*f16;
	f6 = f13*f12;
	f3 = f3+f9;
	f9 = f10*f19;
	f7 = f7+f8;
	heapFloat[(r5+10)] = f5;
	f3 = f3+f9;
	heapFloat[(r5+11)] = f7;
	f5 = f15*f16;
	f7 = f11*f12;
	f1 = f1+f6;
	f6 = f22*f19;
	f1 = f1+f6;
	f5 = f5+f7;
	f6 = f20*f19;
	f3 = f3+f29;
	heap32[(r5+12)] = 0;
	f5 = f5+f6;
	f1 = f1+f28;
	heapFloat[(r5+13)] = f3;
	f3 = f5+f27;
	heapFloat[(r5+14)] = f1;
	heapFloat[(r5+15)] = f3;
	heap32[(r5+16)] = 0;
	heap32[(r5+48)] = r3;
	r3 = heap32[(r0+5)];
	r11 = r2 << 2;
	r3 = (r3 + r11)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r11 = r3 >> 2;
	r11 = heap32[(r11)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+3)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r9;
	heap32[(g0+4)] = r10;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	heap32[(r5+48)] = r6;
	heapFloat[(r5+1)] = f2;
	heapFloat[(r5+2)] = f4;
	heapFloat[(r5+3)] = f10;
	f26 = heapFloat[(fp+-4)];
	heapFloat[(r5+4)] = f26;
	heapFloat[(r5+5)] = f17;
	heapFloat[(r5+6)] = f13;
	heapFloat[(r5+7)] = f22;
	f26 = heapFloat[(fp+-3)];
	heapFloat[(r5+8)] = f26;
	heapFloat[(r5+9)] = f15;
	heapFloat[(r5+10)] = f11;
	heapFloat[(r5+11)] = f20;
	f26 = heapFloat[(fp+-2)];
	heapFloat[(r5+12)] = f26;
	heapFloat[(r5+13)] = f29;
	heapFloat[(r5+14)] = f28;
	r2 = (r2 + 1)|0;
	f0 = f_g0 < f0 ? f_g0 : f0;
	heapFloat[(r5+15)] = f27;
	f26 = heapFloat[(fp+-1)];
	heapFloat[(r5+16)] = f26;
if(!(r8 !=r2)) //_LBB253_5
{
break _3;
}
}
}
else{
	f0 =                         1;
}
} while(0);
	f_g0 = f0;
	return;
}
else{
	r0 = _2E_str99;
	r1 = _2E_str1100;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 308;
	_assert(i7);
}
}