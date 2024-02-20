function _ZNK13btConvexShape44localGetSupportVertexWithoutMarginNonVirtualERK9btVector3(sp)
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
var __label__ = 0;
	i7 = sp + -120;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+1)];
	r3 = heap32[(fp)];
	r4 = heap32[(fp+2)];
_1: do {
	if(r2 >4) //_LBB462_4
{
	if(r2 >9) //_LBB462_7
{
	if(r2 ==10) //_LBB462_32
{
	r2 = heap32[(r1+13)];
	r5 = (r2 + 2)|0;
	r4 = r4 >> 2;
	r5 = (r5 % 3)|0;
	f0 = heapFloat[(r4)];
	f1 = heapFloat[(r4+1)];
	r2 = r2 << 2;
	r0 = (r0 + 28)|0;
	r5 = r5 << 2;
	f2 = heapFloat[(r4+2)];
	r4 = (r0 + r2)|0;
	r0 = (r0 + r5)|0;
	f3 = f0*f0;
	f4 = f1*f1;
	r4 = r4 >> 2;
	r0 = r0 >> 2;
	f3 = f3+f4;
	f4 = f2*f2;
	f3 = f3+f4;
	f4 = heapFloat[(r4)];
	f5 = heapFloat[(r0)];
	f6 =   9.9999997473787516e-005;
	if(f3 >=f6) //_LBB462_34
{
	heapFloat[(g0)] = f3;
	f3 =                         1;
	sqrtf(i7);
	f3 = f3/f_g0;
	f0 = f0*f3;
	f1 = f1*f3;
	f2 = f2*f3;
}
else{
	f0 =                         1;
	f1 =                         0;
	f2 = f1;
}
	r0 = sp + -64;
	r4 = r0 >> 2;
	heap32[(fp+-16)] = 0;
	heap32[(r4+1)] = 0;
	r0 = (r0 + r2)|0;
	heap32[(r4+2)] = 0;
	r0 = r0 >> 2;
	heap32[(r4+3)] = 0;
	heapFloat[(r0)] = f4;
	f3 = heapFloat[(r1+4)];
	f6 = heapFloat[(r1+3)];
	f7 = heapFloat[(r1+5)];
	f3 = f1*f3;
	f6 = f0*f6;
	f8 = heapFloat[(r1+11)];
	f7 = f2*f7;
	f3 = f3*f5;
	f9 = heapFloat[(r4+1)];
	f6 = f6*f5;
	f10 = heapFloat[(fp+-16)];
	f5 = f7*f5;
	f7 = heapFloat[(r4+2)];
	f11 = f1*f8;
	f9 = f9+f3;
	f12 = f0*f8;
	f10 = f10+f6;
	f9 = f9-f11;
	f10 = f10-f12;
	f8 = f2*f8;
	f7 = f7+f5;
	f7 = f7-f8;
	f13 = f0*f10;
	f14 = f1*f9;
	f13 = f13+f14;
	f14 = f2*f7;
	f13 = f13+f14;
	f14 =       -999999984306749440;
	if(f13 >f14) //_LBB462_37
{
	f14 = f13;
}
else{
	f10 =                         0;
	f9 = f10;
	f7 = f10;
}
	r0 = sp + -80;
	r1 = r0 >> 2;
	heap32[(fp+-20)] = 0;
	heap32[(r1+1)] = 0;
	r0 = (r0 + r2)|0;
	heap32[(r1+2)] = 0;
	r0 = r0 >> 2;
	f4 = -f4;
	heap32[(r1+3)] = 0;
	heapFloat[(r0)] = f4;
	f4 = heapFloat[(r1+1)];
	f13 = heapFloat[(fp+-20)];
	f15 = heapFloat[(r1+2)];
	f3 = f4+f3;
	f4 = f13+f6;
	f4 = f4-f12;
	f3 = f3-f11;
	f5 = f15+f5;
	f0 = f0*f4;
	f1 = f1*f3;
	f5 = f5-f8;
	f0 = f0+f1;
	f1 = f2*f5;
	f0 = f0+f1;
	r0 = r3 >> 2;
	f1 = f0 > f14 ? f4 : f10;
	f2 = f0 > f14 ? f3 : f9;
	heapFloat[(r0)] = f1;
	f0 = f0 > f14 ? f5 : f7;
__label__ = 11;
break _1;
}
else{
	if(r2 ==13) //_LBB462_16
{
	r0 = sp + -16;
	r2 = r0 >> 2;
	heap32[(fp+-4)] = heap32[(r1+7)];
	heap32[(r2+1)] = heap32[(r1+8)];
	heap32[(r2+2)] = heap32[(r1+9)];
	r4 = r4 >> 2;
	heap32[(r2+3)] = heap32[(r1+10)];
	r2 = sp + -32;
	heap32[(fp+-8)] = heap32[(r4)];
	f0 = heapFloat[(r4+1)];
	r5 = r2 >> 2;
	heapFloat[(r5+1)] = f0;
	f1 = heapFloat[(r4+2)];
	heapFloat[(r5+2)] = f1;
	heap32[(r5+3)] = 0;
	r1 = heap32[(r1+13)];
	if(r1 ==2) //_LBB462_21
{
	r4 = 0;
	r5 = 2;
	r6 = 1;
	f1 = f0;
}
else{
	if(r1 ==1) //_LBB462_20
{
	r4 = 0;
	r5 = 1;
	r6 = 2;
}
else{
	if(r1 !=0) //_LBB462_22
{
	r0 = _2E_str10;
	r1 = _2E_str7250;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 175;
	_assert(i7);
}
else{
	r4 = 1;
	r5 = 0;
	r6 = 2;
}
}
}
	r1 = r1 << 2;
	r4 = r4 << 2;
	r7 = (r0 + r4)|0;
	r0 = (r0 + r1)|0;
	r1 = (r2 + r4)|0;
	r7 = r7 >> 2;
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	f0 = heapFloat[(r1)];
	f2 = heapFloat[(r7)];
	f3 = heapFloat[(r0)];
	f4 = f0*f0;
	f5 = f1*f1;
	f4 = f4+f5;
	heapFloat[(g0)] = f4;
	sqrtf(i7);
	f4 = f_g0;
	f5 =                         0;
	if(f4 ==f5) //_LBB462_28
{
	r0 = sp + -48;
	r1 = (r0 + r4)|0;
	r4 = r5 << 2;
	r2 = (r2 + r4)|0;
	r1 = r1 >> 2;
	r2 = r2 >> 2;
	heapFloat[(r1)] = f2;
	f0 = heapFloat[(r2)];
	if(f0 <f5) //_LBB462_30
{
	f3 = -f3;
}
	r1 = r6 << 2;
	r4 = (r0 + r4)|0;
	r1 = (r0 + r1)|0;
	r4 = r4 >> 2;
	r1 = r1 >> 2;
	heapFloat[(r4)] = f3;
	r3 = r3 >> 2;
	heap32[(r1)] = 0;
	r0 = r0 >> 2;
	heap32[(r3)] = heap32[(fp+-12)];
	heap32[(r3+1)] = heap32[(r0+1)];
	heap32[(r3+2)] = heap32[(r0+2)];
	heap32[(r3+3)] = 0;
	return;
}
else{
	r0 = sp + -48;
	r4 = (r0 + r4)|0;
	f2 = f2/f4;
	r1 = r5 << 2;
	r2 = (r2 + r1)|0;
	r4 = r4 >> 2;
	f0 = f0*f2;
	r2 = r2 >> 2;
	heapFloat[(r4)] = f0;
	f0 = heapFloat[(r2)];
	if(f0 <f5) //_LBB462_26
{
	f3 = -f3;
}
	r4 = r6 << 2;
	r1 = (r0 + r1)|0;
	r4 = (r0 + r4)|0;
	r1 = r1 >> 2;
	r4 = r4 >> 2;
	f2 = f1*f2;
	heapFloat[(r1)] = f3;
	r1 = r3 >> 2;
	heapFloat[(r4)] = f2;
	r4 = r0 >> 2;
	heap32[(r1)] = heap32[(fp+-12)];
	heap32[(r1+1)] = heap32[(r4+1)];
	heap32[(r1+2)] = heap32[(r4+2)];
	heap32[(r1+3)] = 0;
	return;
}
}
else{
__label__ = 40;
break _1;
}
}
}
else{
	if(r2 ==5) //_LBB462_39
{
	r0 = r4 >> 2;
	f0 = heapFloat[(r1+5)];
	r4 = heap32[(r1+22)];
__label__ = 38;
break _1;
}
else{
	if(r2 ==8) //_LBB462_9
{
	r0 = r3 >> 2;
	heap32[(r0)] = 0;
	heap32[(r0+1)] = 0;
	heap32[(r0+2)] = 0;
	heap32[(r0+3)] = 0;
	return;
}
else{
__label__ = 40;
break _1;
}
}
}
}
else{
	if(r2 ==0) //_LBB462_10
{
	r0 = r4 >> 2;
	f0 = heapFloat[(r1+7)];
	f1 = heapFloat[(r1+9)];
	f2 = heapFloat[(r1+8)];
	f3 =                         0;
	f4 = -f0;
	f5 = heapFloat[(r0)];
	f6 = heapFloat[(r0+2)];
	f7 = heapFloat[(r0+1)];
	f8 = -f2;
	r0 = r3 >> 2;
	f0 = f5 < f3 ? f4 : f0;
	f4 = -f1;
	f2 = f7 < f3 ? f8 : f2;
	heapFloat[(r0)] = f0;
	f0 = f6 < f3 ? f4 : f1;
__label__ = 11;
break _1;
}
else{
	if(r2 ==1) //_LBB462_12
{
	r4 = r4 >> 2;
	f0 = heapFloat[(r1+13)];
	f1 = heapFloat[(r4)];
	f2 = heapFloat[(r1+17)];
	f3 = heapFloat[(r1+21)];
	f4 = heapFloat[(r1+14)];
	f5 = heapFloat[(r4+1)];
	f6 = heapFloat[(r1+18)];
	f7 = heapFloat[(r1+22)];
	f0 = f1*f0;
	f4 = f5*f4;
	f8 = heapFloat[(r1+15)];
	f9 = heapFloat[(r4+2)];
	f10 = heapFloat[(r1+19)];
	f11 = heapFloat[(r1+23)];
	f2 = f1*f2;
	f6 = f5*f6;
	f1 = f1*f3;
	f3 = f5*f7;
	f0 = f0+f4;
	f4 = f9*f8;
	f2 = f2+f6;
	f5 = f9*f10;
	f1 = f1+f3;
	f3 = f9*f11;
	f0 = f0+f4;
	f2 = f2+f5;
	f1 = f1+f3;
	if(f0 >=f2) //_LBB462_14
{
	r1 = 2;
	r4 = 0;
	r1 = f0 < f1 ? r1 : r4;
}
else{
	r1 = 2;
	r4 = 1;
	r1 = f2 < f1 ? r1 : r4;
}
	r1 = r1 << 4;
	r0 = (r0 + r1)|0;
	r0 = r0 >> 2;
	f0 = heapFloat[(r0+15)];
	f1 = heapFloat[(r0+14)];
	r1 = r3 >> 2;
	heap32[(r1)] = heap32[(r0+13)];
	heapFloat[(r1+1)] = f1;
	heapFloat[(r1+2)] = f0;
	heap32[(r1+3)] = 0;
	return;
}
else{
	if(r2 ==4) //_LBB462_41
{
	r0 = r4 >> 2;
	f0 = heapFloat[(r1+5)];
	r4 = heap32[(r1+25)];
__label__ = 38;
}
else{
__label__ = 40;
}
}
}
}
} while(0);
switch(__label__ ){//multiple entries
case 11:
	heapFloat[(r0+1)] = f2;
	heapFloat[(r0+2)] = f0;
	heap32[(r0+3)] = 0;
	return;
break;
case 40:
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+16)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	return;
break;
case 38:
	r2 = heap32[(r1+23)];
	f1 = heapFloat[(r0)];
	f2 = heapFloat[(r0+1)];
	f3 = heapFloat[(r0+2)];
	f4 = heapFloat[(r1+3)];
	f5 = heapFloat[(r1+4)];
	heap32[(g0)] = r3;
	heapFloat[(g0+1)] = f1;
	heapFloat[(g0+2)] = f2;
	heapFloat[(g0+3)] = f3;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r2;
	heapFloat[(g0+6)] = f4;
	heapFloat[(g0+7)] = f5;
	heapFloat[(g0+8)] = f0;
	_ZL17convexHullSupportRK9btVector3PS0_iS1_(i7);
	return;
break;
}
}