function _ZNK14btQuantizedBvh27walkStacklessTreeAgainstRayEP21btNodeOverlapCallbackRK9btVector3S4_S4_S4_ii(sp)
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
	var r19;
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
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+60];
	if(r1 ==0) //_LBB156_2
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = heap32[(fp+4)];
	r5 = heap32[(fp+5)];
	r3 = r3 >> 2;
	r2 = r2 >> 2;
	f0 = heapFloat[(r2)];
	f1 = heapFloat[(r3)];
	f2 = heapFloat[(r3+1)];
	f3 = heapFloat[(r2+1)];
	r4 = r4 >> 2;
	r5 = r5 >> 2;
	f4 = f1-f0;
	r0 = r0 >> 2;
	f5 = f2-f3;
	f6 = heapFloat[(r3+2)];
	f7 = heapFloat[(r2+2)];
	r6 = heap32[(r0+24)];
	f8 = f6-f7;
	f9 = f4*f4;
	f10 = f5*f5;
	f11 = heapFloat[(r4)];
	f12 = heapFloat[(r4+1)];
	f13 = heapFloat[(r4+2)];
	f14 = heapFloat[(r5)];
	f15 = heapFloat[(r5+1)];
	f16 = heapFloat[(r5+2)];
	f9 = f9+f10;
	f10 = f8*f8;
	f9 = f9+f10;
	heapFloat[(g0)] = f9;
	sqrtf(i7);
	f10 =                         1;
	f9 = f10/f_g0;
	f17 = heapFloat[(r3)];
	f18 = heapFloat[(r2)];
	f19 = heapFloat[(r3+1)];
	f20 = heapFloat[(r2+1)];
	f4 = f4*f9;
	f17 = f17-f18;
	f5 = f5*f9;
	f18 = f19-f20;
	f19 = heapFloat[(r3+2)];
	f20 = heapFloat[(r2+2)];
	f8 = f8*f9;
	f9 = f19-f20;
	f17 = f4*f17;
	f18 = f5*f18;
	f19 = f1 < f0 ? f1 : f0;
	f20 = f2 < f3 ? f2 : f3;
	f21 = f6 < f7 ? f6 : f7;
	f0 = f0 < f1 ? f1 : f0;
	f1 = f3 < f2 ? f2 : f3;
	f2 = f7 < f6 ? f6 : f7;
	f3 = f17+f18;
	f6 = f8*f9;
	f7 = f19+f11;
	f9 = f20+f12;
	f11 = f21+f13;
	f0 = f0+f14;
	f1 = f1+f15;
	f2 = f2+f16;
	f3 = f3+f6;
	f6 =                         0;
	if(f4 !=f6) //_LBB156_4
{
	f4 = f10/f4;
}
else{
	f4 =        999999984306749440;
}
	if(f5 !=f6) //_LBB156_7
{
	f5 = f10/f5;
}
else{
	f5 =        999999984306749440;
}
	if(f8 !=f6) //_LBB156_10
{
	f8 = f10/f8;
}
else{
	f8 =        999999984306749440;
}
	r3 = f4 < f6;
	r7 = f5 < f6;
	r8 = f8 < f6;
	r3 = r3 & 1;
	r7 = r7 & 1;
	r8 = r8 & 1;
	r9 = r3 ^ 1;
	r10 = r7 ^ 1;
	r11 = r8 ^ 1;
	r12 = 0;
	r13 = r12;
_15: while(true){
	r14 = heap32[(r0+14)];
	if(r14 >r12) //_LBB156_12
{
	if(r14 >r13) //_LBB156_14
{
	r14 = r6 >> 2;
	f10 = heapFloat[(r14)];
	r15 = sp + -32;
	heapFloat[(fp+-8)] = f10;
	r16 = r15 >> 2;
	f12 = heapFloat[(r14+1)];
	heapFloat[(r16+1)] = f12;
	f13 = heapFloat[(r14+2)];
	heapFloat[(r16+2)] = f13;
	heap32[(r16+3)] = heap32[(r14+3)];
	f14 = heapFloat[(r14+4)];
	heapFloat[(r16+4)] = f14;
	f15 = heapFloat[(r14+5)];
	heapFloat[(r16+5)] = f15;
	f16 = heapFloat[(r14+6)];
	heapFloat[(r16+6)] = f16;
	heap32[(r16+7)] = heap32[(r14+7)];
	f17 = heapFloat[(r5)];
	f10 = f10-f17;
	heapFloat[(fp+-8)] = f10;
	f10 = heapFloat[(r5+1)];
	f10 = f12-f10;
	heapFloat[(r16+1)] = f10;
	f10 = heapFloat[(r5+2)];
	f10 = f13-f10;
	heapFloat[(r16+2)] = f10;
	f10 = heapFloat[(r4)];
	f10 = f14-f10;
	heapFloat[(r16+4)] = f10;
	f10 = heapFloat[(r4+1)];
	f10 = f15-f10;
	heapFloat[(r16+5)] = f10;
	f10 = heapFloat[(r4+2)];
	r13 = (r13 + 1)|0;
	f10 = f16-f10;
	heapFloat[(r16+6)] = f10;
	f10 = heapFloat[(r14+4)];
	if(f7 >f10) //_LBB156_17
{
__label__ = 17;
}
else{
	f10 = heapFloat[(r14)];
	if(f0 <f10) //_LBB156_17
{
__label__ = 17;
}
else{
	r16 = 1;
__label__ = 18;
}
}
if (__label__ == 17){
	r16 = 0;
}
	f10 = heapFloat[(r14+6)];
	if(f11 >f10) //_LBB156_21
{
__label__ = 20;
}
else{
	f10 = heapFloat[(r14+2)];
	if(f2 <f10) //_LBB156_21
{
__label__ = 20;
}
else{
__label__ = 21;
}
}
if (__label__ == 20){
	r16 = 0;
}
	f10 = heapFloat[(r14+5)];
	if(f9 >f10) //_LBB156_32
{
__label__ = 30;
}
else{
	f10 = heapFloat[(r14+1)];
	if(f1 <f10) //_LBB156_32
{
__label__ = 30;
}
else{
	r16 = r16 & 255;
	if(r16 ==0) //_LBB156_32
{
__label__ = 30;
}
else{
	r16 = r3 << 4;
	r17 = r10 << 4;
	r16 = (r15 + r16)|0;
	r17 = (r15 + r17)|0;
	r16 = r16 >> 2;
	r17 = r17 >> 2;
	f10 = heapFloat[(r16)];
	f12 = heapFloat[(r2)];
	f13 = heapFloat[(r17+1)];
	f14 = heapFloat[(r2+1)];
	f10 = f10-f12;
	f13 = f13-f14;
	f10 = f10*f4;
	f13 = f13*f5;
	if(f10 >f13) //_LBB156_32
{
__label__ = 30;
}
else{
	r16 = r9 << 4;
	r17 = r7 << 4;
	r16 = (r15 + r16)|0;
	r17 = (r15 + r17)|0;
	r16 = r16 >> 2;
	r17 = r17 >> 2;
	f15 = heapFloat[(r16)];
	f16 = heapFloat[(r17+1)];
	f12 = f15-f12;
	f14 = f16-f14;
	f12 = f12*f4;
	f14 = f14*f5;
	if(f14 >f12) //_LBB156_32
{
__label__ = 30;
}
else{
	r16 = r11 << 4;
	r16 = (r15 + r16)|0;
	r16 = r16 >> 2;
	f15 = heapFloat[(r16+2)];
	f16 = heapFloat[(r2+2)];
	f15 = f15-f16;
	f10 = f10 < f14 ? f14 : f10;
	f14 = f15*f8;
	if(f10 >f14) //_LBB156_32
{
__label__ = 30;
}
else{
	r16 = r8 << 4;
	r15 = (r15 + r16)|0;
	r15 = r15 >> 2;
	f15 = heapFloat[(r15+2)];
	f15 = f15-f16;
	f12 = f13 < f12 ? f13 : f12;
	f13 = f15*f8;
	if(f13 >f12) //_LBB156_32
{
__label__ = 30;
}
else{
	f10 = f10 < f13 ? f13 : f10;
	f12 = f14 < f12 ? f14 : f12;
	r15 = f10 >= f3;
	r16 = f12 <= f6;
	r15 = r15 | r16;
	r16 = r15 & 1;
	r17 = heap32[(r14+8)];
	r18 = -1;
	r16 = r16 ^ 1;
	r19 = r17 == r18;
	if(r15 != 0) //_LBB156_31
{
__label__ = 32;
}
else{
	r15 = r17 != r18;
	r15 = r15 & 1;
	if(r15 ==0) //_LBB156_33
{
	r15 = r1 >> 2;
	r15 = heap32[(r15)];
	r15 = r15 >> 2;
	r15 = heap32[(r15+2)];
	r17 = heap32[(r14+10)];
	r18 = heap32[(r14+9)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r18;
	heap32[(g0+2)] = r17;
	__FUNCTION_TABLE__[(r15)>>2](i7);
__label__ = 32;
}
else{
__label__ = 32;
}
}
}
}
}
}
}
}
}
if (__label__ == 30){
	r16 = heap32[(r14+8)];
	r19 = -1;
	r19 = r16 == r19;
	r16 = 0;
}
if(!(r16 !=0)) //_LBB156_36
{
	r15 = r19 & 1;
	if(r15 ==0) //_LBB156_37
{
	r14 = heap32[(r14+8)];
	r15 = r14 << 6;
	r6 = (r6 + r15)|0;
	r12 = (r14 + r12)|0;
continue _15;
}
}
	r6 = (r6 + 64)|0;
	r12 = (r12 + 1)|0;
}
else{
__label__ = 13;
break _15;
}
}
else{
__label__ = 37;
break _15;
}
}
switch(__label__ ){//multiple entries
case 37:
	r0 = maxIterations;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
if(!(r1 >=r13)) //_LBB156_41
{
	heap32[(r0)] = r13;
}
	return;
break;
case 13:
	r0 = _2E_str1921;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 490;
	_assert(i7);
break;
}
}
else{
	r0 = _2E_str1844;
	r1 = _2E_str537;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 451;
	_assert(i7);
}
}