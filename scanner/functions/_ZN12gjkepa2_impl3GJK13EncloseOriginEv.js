function _ZN12gjkepa2_impl3GJK13EncloseOriginEv(sp)
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
var __label__ = 0;
	i7 = sp + -128;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+93)];
	r3 = r2 >> 2;
	r4 = heap32[(r3+8)];
_1: do {
	if(r4 >2) //_LBB544_3
{
	if(r4 ==3) //_LBB544_17
{
	r5 = heap32[(r3)];
	r6 = heap32[(r3+2)];
	r7 = heap32[(r3+1)];
	r6 = r6 >> 2;
	r5 = r5 >> 2;
	r7 = r7 >> 2;
	f0 = heapFloat[(r6+6)];
	f1 = heapFloat[(r5+6)];
	f2 = heapFloat[(r7+6)];
	f3 = heapFloat[(r6+5)];
	f4 = heapFloat[(r5+5)];
	f5 = heapFloat[(r7+5)];
	f5 = f5-f4;
	f0 = f0-f1;
	f1 = f2-f1;
	f2 = f3-f4;
	f3 = heapFloat[(r6+4)];
	f4 = heapFloat[(r5+4)];
	f6 = heapFloat[(r7+4)];
	f3 = f3-f4;
	f4 = f6-f4;
	f6 = f5*f0;
	f7 = f1*f2;
	r5 = sp + -112;
	f6 = f6-f7;
	f1 = f1*f3;
	f0 = f4*f0;
	f0 = f1-f0;
	r6 = r5 >> 2;
	heapFloat[(fp+-28)] = f6;
	f1 = f4*f2;
	f2 = f5*f3;
	f1 = f1-f2;
	heapFloat[(r6+1)] = f0;
	f2 = f6*f6;
	f0 = f0*f0;
	heapFloat[(r6+2)] = f1;
	f0 = f2+f0;
	f1 = f1*f1;
	f0 = f0+f1;
	f1 =                         0;
	heap32[(r6+3)] = 0;
	if(f0 <=f1) //_LBB544_25
{
__label__ = 24;
break _1;
}
else{
	r4 = r4 << 2;
	r4 = (r2 + r4)|0;
	r4 = r4 >> 2;
	heap32[(r4+4)] = 0;
	r4 = heap32[(r1+91)];
	r4 = (r4 + -1)|0;
	r7 = heap32[(r3+8)];
	r8 = r4 << 2;
	r7 = r7 << 2;
	r8 = (r0 + r8)|0;
	r7 = (r2 + r7)|0;
	r8 = r8 >> 2;
	heap32[(r1+91)] = r4;
	r4 = r7 >> 2;
	r7 = heap32[(r8+87)];
	heap32[(r4)] = r7;
	r4 = heap32[(r3+8)];
	r7 = r4 << 2;
	r2 = (r2 + r7)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r4 = (r4 + 1)|0;
	heap32[(r3+8)] = r4;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r2;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	heap32[(g0)] = r0;
	_ZN12gjkepa2_impl3GJK13EncloseOriginEv(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB544_26
{
__label__ = 25;
break _1;
}
else{
	r3 = heap32[(r1+93)];
	r2 = r3 >> 2;
	r4 = heap32[(r2+8)];
	r4 = (r4 + -1)|0;
	r5 = heap32[(r1+91)];
	r7 = r4 << 2;
	r3 = (r3 + r7)|0;
	r7 = (r0 + 348)|0;
	r8 = r5 << 2;
	r8 = (r7 + r8)|0;
	r3 = r3 >> 2;
	heap32[(r2+8)] = r4;
	r2 = r8 >> 2;
	r3 = heap32[(r3)];
	r4 = (r5 + 1)|0;
	heap32[(r2)] = r3;
	heap32[(r1+91)] = r4;
	f0 = heapFloat[(r6+2)];
	f1 = heapFloat[(r6+1)];
	f2 = heapFloat[(fp+-28)];
	r3 = sp + -16;
	f2 = -f2;
	r2 = r3 >> 2;
	f1 = -f1;
	heapFloat[(fp+-4)] = f2;
	f0 = -f0;
	heapFloat[(r2+1)] = f1;
	heapFloat[(r2+2)] = f0;
	heap32[(r2+3)] = 0;
	r2 = heap32[(r1+93)];
	r4 = r2 >> 2;
	r5 = heap32[(r4+8)];
	r5 = r5 << 2;
	r5 = (r2 + r5)|0;
	r5 = r5 >> 2;
	heap32[(r5+4)] = 0;
	r5 = heap32[(r1+91)];
	r5 = (r5 + -1)|0;
	r6 = heap32[(r4+8)];
	r8 = r5 << 2;
	r6 = r6 << 2;
	r7 = (r7 + r8)|0;
	r6 = (r2 + r6)|0;
	r7 = r7 >> 2;
	heap32[(r1+91)] = r5;
	r5 = r6 >> 2;
	r6 = heap32[(r7)];
	heap32[(r5)] = r6;
	r5 = heap32[(r4+8)];
	r6 = r5 << 2;
	r2 = (r2 + r6)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r5 = (r5 + 1)|0;
	heap32[(r4+8)] = r5;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r2;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	heap32[(g0)] = r0;
	_ZN12gjkepa2_impl3GJK13EncloseOriginEv(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB544_26
{
__label__ = 25;
break _1;
}
else{
	r3 = heap32[(r1+93)];
	r2 = r3 >> 2;
	r4 = heap32[(r2+8)];
	r4 = (r4 + -1)|0;
	r5 = heap32[(r1+91)];
	r6 = r4 << 2;
	r7 = r5 << 2;
	r3 = (r3 + r6)|0;
	r0 = (r0 + r7)|0;
	r3 = r3 >> 2;
	heap32[(r2+8)] = r4;
	r0 = r0 >> 2;
	r3 = heap32[(r3)];
	r2 = (r5 + 1)|0;
	heap32[(r0+87)] = r3;
	heap32[(r1+91)] = r2;
	r3 = 0;
	r_g0 = r3;
	return;
}
}
}
}
else{
	if(r4 ==4) //_LBB544_21
{
	r0 = heap32[(r3)];
	r1 = heap32[(r3+1)];
	r2 = heap32[(r3+3)];
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r2 = r2 >> 2;
	r3 = heap32[(r3+2)];
	r3 = r3 >> 2;
	f0 = heapFloat[(r1+6)];
	f1 = heapFloat[(r2+6)];
	f2 = heapFloat[(r0+6)];
	f3 = heapFloat[(r0+5)];
	f4 = heapFloat[(r2+5)];
	f5 = heapFloat[(r1+4)];
	f6 = heapFloat[(r2+4)];
	f7 = heapFloat[(r3+5)];
	f8 = heapFloat[(r0+4)];
	f9 = heapFloat[(r3+4)];
	f0 = f0-f1;
	f3 = f3-f4;
	f5 = f5-f6;
	f2 = f2-f1;
	f8 = f8-f6;
	f10 = f3*f0;
	f6 = f9-f6;
	f9 = f2*f5;
	f7 = f7-f4;
	f0 = f8*f0;
	f11 = heapFloat[(r3+6)];
	f12 = heapFloat[(r1+5)];
	f10 = f10*f6;
	f9 = f9*f7;
	f4 = f12-f4;
	f9 = f10+f9;
	f0 = f0*f7;
	f3 = f3*f5;
	f1 = f11-f1;
	f5 = f8*f4;
	f0 = f9-f0;
	f3 = f3*f1;
	f2 = f2*f4;
	f0 = f0-f3;
	f1 = f5*f1;
	f0 = f0+f1;
	f1 = f2*f6;
	f0 = f0-f1;
	f1 =                         0;
	if(f0 <f1) //_LBB544_23
{
	f0 = -f0;
}
	r0 = f0 > f1;
	r0 = r0 & 1;
	r_g0 = r0;
	return;
}
else{
__label__ = 24;
break _1;
}
}
}
else{
	if(r4 ==1) //_LBB544_5
{
	r2 = 0;
_16: while(true){
	if(uint(r2) <uint(3)) //_LBB544_6
{
	r3 = sp + -64;
	r4 = r3 >> 2;
	heap32[(fp+-16)] = 0;
	r5 = r2 << 2;
	heap32[(r4+1)] = 0;
	r5 = (r3 + r5)|0;
	heap32[(r4+2)] = 0;
	r5 = r5 >> 2;
	heap32[(r4+3)] = 0;
	heap32[(r5)] = 1065353216;
	r5 = heap32[(r1+93)];
	r6 = r5 >> 2;
	r7 = heap32[(r6+8)];
	r7 = r7 << 2;
	r7 = (r5 + r7)|0;
	r7 = r7 >> 2;
	heap32[(r7+4)] = 0;
	r7 = heap32[(r1+91)];
	r7 = (r7 + -1)|0;
	r8 = heap32[(r6+8)];
	r9 = r7 << 2;
	r8 = r8 << 2;
	r9 = (r0 + r9)|0;
	r8 = (r5 + r8)|0;
	r9 = r9 >> 2;
	heap32[(r1+91)] = r7;
	r7 = r8 >> 2;
	r8 = heap32[(r9+87)];
	heap32[(r7)] = r8;
	r7 = heap32[(r6+8)];
	r8 = r7 << 2;
	r5 = (r5 + r8)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r7 = (r7 + 1)|0;
	heap32[(r6+8)] = r7;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r5;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	heap32[(g0)] = r0;
	_ZN12gjkepa2_impl3GJK13EncloseOriginEv(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB544_26
{
__label__ = 25;
break _1;
}
else{
	r3 = heap32[(r1+93)];
	r5 = r3 >> 2;
	r6 = heap32[(r5+8)];
	r6 = (r6 + -1)|0;
	r7 = heap32[(r1+91)];
	r8 = r6 << 2;
	r3 = (r3 + r8)|0;
	r8 = (r0 + 348)|0;
	r9 = r7 << 2;
	r9 = (r8 + r9)|0;
	r3 = r3 >> 2;
	heap32[(r5+8)] = r6;
	r5 = r9 >> 2;
	r3 = heap32[(r3)];
	r6 = (r7 + 1)|0;
	heap32[(r5)] = r3;
	heap32[(r1+91)] = r6;
	f0 = heapFloat[(r4+2)];
	f1 = heapFloat[(r4+1)];
	f2 = heapFloat[(fp+-16)];
	r3 = sp + -48;
	f2 = -f2;
	r4 = r3 >> 2;
	f1 = -f1;
	heapFloat[(fp+-12)] = f2;
	f0 = -f0;
	heapFloat[(r4+1)] = f1;
	heapFloat[(r4+2)] = f0;
	heap32[(r4+3)] = 0;
	r4 = heap32[(r1+93)];
	r5 = r4 >> 2;
	r6 = heap32[(r5+8)];
	r6 = r6 << 2;
	r6 = (r4 + r6)|0;
	r6 = r6 >> 2;
	heap32[(r6+4)] = 0;
	r6 = heap32[(r1+91)];
	r6 = (r6 + -1)|0;
	r7 = heap32[(r5+8)];
	r9 = r6 << 2;
	r7 = r7 << 2;
	r8 = (r8 + r9)|0;
	r7 = (r4 + r7)|0;
	r8 = r8 >> 2;
	heap32[(r1+91)] = r6;
	r6 = r7 >> 2;
	r7 = heap32[(r8)];
	heap32[(r6)] = r7;
	r6 = heap32[(r5+8)];
	r7 = r6 << 2;
	r4 = (r4 + r7)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r6 = (r6 + 1)|0;
	heap32[(r5+8)] = r6;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	heap32[(g0)] = r0;
	_ZN12gjkepa2_impl3GJK13EncloseOriginEv(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB544_26
{
__label__ = 25;
break _1;
}
else{
	r3 = heap32[(r1+93)];
	r4 = r3 >> 2;
	r5 = heap32[(r4+8)];
	r5 = (r5 + -1)|0;
	r6 = heap32[(r1+91)];
	r7 = r5 << 2;
	r8 = r6 << 2;
	r3 = (r3 + r7)|0;
	r7 = (r0 + r8)|0;
	r3 = r3 >> 2;
	heap32[(r4+8)] = r5;
	r4 = r7 >> 2;
	r3 = heap32[(r3)];
	r2 = (r2 + 1)|0;
	r5 = (r6 + 1)|0;
	heap32[(r4+87)] = r3;
	heap32[(r1+91)] = r5;
continue _16;
}
}
}
else{
__label__ = 24;
break _1;
}
}
}
else{
	if(r4 ==2) //_LBB544_10
{
	r2 = heap32[(r3+1)];
	r3 = heap32[(r3)];
	r2 = r2 >> 2;
	r3 = r3 >> 2;
	f0 = heapFloat[(r2+6)];
	f1 = heapFloat[(r3+6)];
	f2 = heapFloat[(r2+5)];
	f3 = heapFloat[(r3+5)];
	f4 = heapFloat[(r2+4)];
	f5 = heapFloat[(r3+4)];
	f0 = f0-f1;
	f1 = f2-f3;
	f2 = f4-f5;
	r2 = 0;
_23: while(true){
	if(uint(r2) <uint(3)) //_LBB544_11
{
	r3 = sp + -80;
	r4 = r3 >> 2;
	heap32[(fp+-20)] = 0;
	r5 = r2 << 2;
	heap32[(r4+1)] = 0;
	r3 = (r3 + r5)|0;
	heap32[(r4+2)] = 0;
	r3 = r3 >> 2;
	heap32[(r4+3)] = 0;
	heap32[(r3)] = 1065353216;
	f3 = heapFloat[(r4+2)];
	f4 = heapFloat[(r4+1)];
	f5 = heapFloat[(fp+-20)];
	f6 = f1*f3;
	f7 = f0*f4;
	r3 = sp + -96;
	f6 = f6-f7;
	f7 = f0*f5;
	f3 = f2*f3;
	f3 = f7-f3;
	r4 = r3 >> 2;
	heapFloat[(fp+-24)] = f6;
	f4 = f2*f4;
	f5 = f1*f5;
	f4 = f4-f5;
	heapFloat[(r4+1)] = f3;
	f5 = f6*f6;
	f3 = f3*f3;
	heapFloat[(r4+2)] = f4;
	f3 = f5+f3;
	f4 = f4*f4;
	f3 = f3+f4;
	f4 =                         0;
	heap32[(r4+3)] = 0;
if(!(f3 <=f4)) //_LBB544_15
{
	r5 = heap32[(r1+93)];
	r6 = r5 >> 2;
	r7 = heap32[(r6+8)];
	r7 = r7 << 2;
	r7 = (r5 + r7)|0;
	r7 = r7 >> 2;
	heap32[(r7+4)] = 0;
	r7 = heap32[(r1+91)];
	r7 = (r7 + -1)|0;
	r8 = heap32[(r6+8)];
	r9 = r7 << 2;
	r8 = r8 << 2;
	r9 = (r0 + r9)|0;
	r8 = (r5 + r8)|0;
	r9 = r9 >> 2;
	heap32[(r1+91)] = r7;
	r7 = r8 >> 2;
	r8 = heap32[(r9+87)];
	heap32[(r7)] = r8;
	r7 = heap32[(r6+8)];
	r8 = r7 << 2;
	r5 = (r5 + r8)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r7 = (r7 + 1)|0;
	heap32[(r6+8)] = r7;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r5;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	heap32[(g0)] = r0;
	_ZN12gjkepa2_impl3GJK13EncloseOriginEv(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB544_26
{
__label__ = 25;
break _1;
}
else{
	r3 = heap32[(r1+93)];
	r5 = r3 >> 2;
	r6 = heap32[(r5+8)];
	r6 = (r6 + -1)|0;
	r7 = heap32[(r1+91)];
	r8 = r6 << 2;
	r3 = (r3 + r8)|0;
	r8 = (r0 + 348)|0;
	r9 = r7 << 2;
	r9 = (r8 + r9)|0;
	r3 = r3 >> 2;
	heap32[(r5+8)] = r6;
	r5 = r9 >> 2;
	r3 = heap32[(r3)];
	r6 = (r7 + 1)|0;
	heap32[(r5)] = r3;
	heap32[(r1+91)] = r6;
	f3 = heapFloat[(r4+2)];
	f4 = heapFloat[(r4+1)];
	f5 = heapFloat[(fp+-24)];
	r3 = sp + -32;
	f5 = -f5;
	r4 = r3 >> 2;
	f4 = -f4;
	heapFloat[(fp+-8)] = f5;
	f3 = -f3;
	heapFloat[(r4+1)] = f4;
	heapFloat[(r4+2)] = f3;
	heap32[(r4+3)] = 0;
	r4 = heap32[(r1+93)];
	r5 = r4 >> 2;
	r6 = heap32[(r5+8)];
	r6 = r6 << 2;
	r6 = (r4 + r6)|0;
	r6 = r6 >> 2;
	heap32[(r6+4)] = 0;
	r6 = heap32[(r1+91)];
	r6 = (r6 + -1)|0;
	r7 = heap32[(r5+8)];
	r9 = r6 << 2;
	r7 = r7 << 2;
	r8 = (r8 + r9)|0;
	r7 = (r4 + r7)|0;
	r8 = r8 >> 2;
	heap32[(r1+91)] = r6;
	r6 = r7 >> 2;
	r7 = heap32[(r8)];
	heap32[(r6)] = r7;
	r6 = heap32[(r5+8)];
	r7 = r6 << 2;
	r4 = (r4 + r7)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r6 = (r6 + 1)|0;
	heap32[(r5+8)] = r6;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	_ZNK12gjkepa2_impl3GJK10getsupportERK9btVector3RNS0_3sSVE(i7);
	heap32[(g0)] = r0;
	_ZN12gjkepa2_impl3GJK13EncloseOriginEv(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB544_26
{
__label__ = 25;
break _1;
}
else{
	r3 = heap32[(r1+93)];
	r4 = r3 >> 2;
	r5 = heap32[(r4+8)];
	r5 = (r5 + -1)|0;
	r6 = heap32[(r1+91)];
	r7 = r5 << 2;
	r8 = r6 << 2;
	r3 = (r3 + r7)|0;
	r7 = (r0 + r8)|0;
	r3 = r3 >> 2;
	heap32[(r4+8)] = r5;
	r4 = r7 >> 2;
	r3 = heap32[(r3)];
	r5 = (r6 + 1)|0;
	heap32[(r4+87)] = r3;
	heap32[(r1+91)] = r5;
}
}
}
	r2 = (r2 + 1)|0;
continue _23;
}
else{
__label__ = 24;
break _1;
}
}
}
else{
__label__ = 24;
}
}
}
} while(0);
switch(__label__ ){//multiple entries
case 24:
	r0 = 0;
	r_g0 = r0;
	return;
break;
case 25:
	r0 = 1;
	r_g0 = r0;
	return;
break;
}
}