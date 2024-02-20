function _ZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_S3_PfRj(sp)
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
	var r14;
	var r15;
	var r16;
	var r17;
	var r18;
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
var __label__ = 0;
	i7 = sp + -96;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = sp + -12;
	r2 = heap32[(fp+1)];
	r3 = r1 >> 2;
	heap32[(fp+-3)] = r0;
	r4 = heap32[(fp+2)];
	heap32[(r3+1)] = r2;
	r5 = r0 >> 2;
	heap32[(r3+2)] = r4;
	r2 = r2 >> 2;
	f0 = heapFloat[(r5+2)];
	f1 = heapFloat[(r2+2)];
	f2 = heapFloat[(r5+1)];
	f3 = heapFloat[(r2+1)];
	f4 = heapFloat[(r5)];
	f5 = heapFloat[(r2)];
	r3 = sp + -64;
	f6 = f4-f5;
	f7 = f2-f3;
	r6 = r3 >> 2;
	heapFloat[(fp+-16)] = f6;
	f8 = f0-f1;
	heapFloat[(r6+1)] = f7;
	heapFloat[(r6+2)] = f8;
	r4 = r4 >> 2;
	heap32[(r6+3)] = 0;
	f9 = heapFloat[(r4+2)];
	f10 = heapFloat[(r4+1)];
	f11 = heapFloat[(r4)];
	f5 = f5-f11;
	f3 = f3-f10;
	heapFloat[(r6+4)] = f5;
	f1 = f1-f9;
	heapFloat[(r6+5)] = f3;
	heapFloat[(r6+6)] = f1;
	f12 = f8*f5;
	f13 = f6*f1;
	f14 = f7*f1;
	f15 = f8*f3;
	f12 = f12-f13;
	f13 = f14-f15;
	f11 = f11-f4;
	heap32[(r6+7)] = 0;
	f14 = f6*f3;
	f15 = f7*f5;
	f14 = f14-f15;
	f10 = f10-f2;
	heapFloat[(r6+8)] = f11;
	f15 = f13*f13;
	f16 = f12*f12;
	f9 = f9-f0;
	heapFloat[(r6+9)] = f10;
	f15 = f15+f16;
	f16 = f14*f14;
	f15 = f15+f16;
	heapFloat[(r6+10)] = f9;
	heap32[(r6+11)] = 0;
	f16 =                         0;
	if(f15 >f16) //_LBB545_2
{
	r6 = heap32[(fp+3)];
	r7 = heap32[(fp+4)];
	r8 = sp + -72;
	r9 = r8 >> 2;
	heap32[(fp+-18)] = 0;
	r10 = 0;
	f17 =                        -1;
	heap32[(r9+1)] = 0;
	heap32[(fp+-19)] = 0;
	r18 = 0;
_3: while(true){
	f18 = f7*f14;
	f19 = f8*f12;
	f8 = f8*f13;
	f20 = f6*f14;
	f18 = f18-f19;
	f8 = f8-f20;
	f6 = f6*f12;
	f7 = f7*f13;
	f4 = f4*f18;
	f2 = f2*f8;
	f6 = f6-f7;
	f2 = f4+f2;
	f0 = f0*f6;
	f0 = f2+f0;
_5: do {
	if(f0 >f16) //_LBB545_5
{
	r11 = _ZZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_S3_PfRjE4imd3;
	r12 = r10 << 2;
	r13 = (r11 + r12)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
	r14 = r13 << 2;
	r15 = (r1 + r14)|0;
	r15 = r15 >> 2;
	r15 = heap32[(r15)];
	r16 = sp + -76;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r15;
	heap32[(g0+2)] = r8;
	heap32[(g0+3)] = r16;
	_ZN12gjkepa2_impl3GJK13projectoriginERK9btVector3S3_PfRj(i7);
	f0 = f_g0;
if(!(f17 <f16)) //_LBB545_7
{
	if(f0 >=f17) //_LBB545_4
{
break _5;
}
}
	r0 = heap32[(fp+-19)];
	r15 = 1;
	r11 = (r11 + r14)|0;
	r16 = r0 & 1;
	r17 = r15 << r10;
	r0 = r0 & 2;
	r13 = r15 << r13;
	r11 = r11 >> 2;
	r15 = r16 == 0 ? r18 : r17;
	r0 = r0 == 0 ? r18 : r13;
	r11 = heap32[(r11)];
	r12 = (r6 + r12)|0;
	r13 = r7 >> 2;
	r0 = (r15 + r0)|0;
	r11 = r11 << 2;
	r14 = (r6 + r14)|0;
	r12 = r12 >> 2;
	heap32[(r13)] = r0;
	r0 = (r6 + r11)|0;
	r11 = r14 >> 2;
	heap32[(r12)] = heap32[(fp+-18)];
	r0 = r0 >> 2;
	heap32[(r11)] = heap32[(r9+1)];
	heap32[(r0)] = 0;
	f17 = f0;
}
} while(0);
	if(r10 ==2) //_LBB545_10
{
break _3;
}
else{
	r11 = (r10 + 1)|0;
	r0 = r10 << 2;
	r0 = (r1 + r0)|0;
	r0 = r0 >> 2;
	r10 = r10 << 4;
	r0 = heap32[(r0+1)];
	r10 = (r3 + r10)|0;
	r10 = r10 >> 2;
	r12 = r0 >> 2;
	f6 = heapFloat[(r10+4)];
	f7 = heapFloat[(r10+5)];
	f8 = heapFloat[(r10+6)];
	f4 = heapFloat[(r12)];
	f2 = heapFloat[(r12+1)];
	f0 = heapFloat[(r12+2)];
	r10 = r11;
}
}
	if(f17 <f16) //_LBB545_12
{
	f17 = heapFloat[(r5)];
	f0 = heapFloat[(r5+1)];
	f2 = heapFloat[(r5+2)];
	f17 = f17*f13;
	f0 = f0*f12;
	heapFloat[(g0)] = f15;
	f17 = f17+f0;
	f0 = f2*f14;
	f17 = f17+f0;
	r0 = r7 >> 2;
	sqrtf(i7);
	f0 = f_g0;
	f17 = f17/f15;
	heap32[(r0)] = 7;
	f2 = f13*f17;
	f4 = heapFloat[(r2)];
	f6 = f12*f17;
	f7 = heapFloat[(r2+1)];
	f8 = heapFloat[(r2+2)];
	f17 = f14*f17;
	f7 = f7-f6;
	f8 = f8-f17;
	f4 = f4-f2;
	f12 = f3*f8;
	f13 = f1*f7;
	f1 = f1*f4;
	f8 = f5*f8;
	f12 = f12-f13;
	f1 = f1-f8;
	f5 = f5*f7;
	f3 = f3*f4;
	f3 = f5-f3;
	f4 = f12*f12;
	f1 = f1*f1;
	f1 = f4+f1;
	f3 = f3*f3;
	f1 = f1+f3;
	heapFloat[(g0)] = f1;
	sqrtf(i7);
	r0 = r6 >> 2;
	f1 = f_g0/f0;
	heapFloat[(r0)] = f1;
	f1 = heapFloat[(r4+2)];
	f3 = heapFloat[(r4+1)];
	f4 = heapFloat[(r4)];
	f3 = f3-f6;
	f1 = f1-f17;
	f4 = f4-f2;
	f5 = f10*f1;
	f7 = f9*f3;
	f8 = f9*f4;
	f1 = f11*f1;
	f5 = f5-f7;
	f1 = f8-f1;
	f3 = f11*f3;
	f4 = f10*f4;
	f3 = f3-f4;
	f4 = f5*f5;
	f1 = f1*f1;
	f1 = f4+f1;
	f3 = f3*f3;
	f1 = f1+f3;
	heapFloat[(g0)] = f1;
	sqrtf(i7);
	f0 = f_g0/f0;
	heapFloat[(r0+1)] = f0;
	f1 = heapFloat[(r0)];
	f3 =                         1;
	f0 = f1+f0;
	f1 = f2*f2;
	f2 = f6*f6;
	f0 = f3-f0;
	f1 = f1+f2;
	f17 = f17*f17;
	heapFloat[(r0+2)] = f0;
	f17 = f1+f17;
}
}
else{
	f17 =                        -1;
}
	f_g0 = f17;
	return;
}