function _ZZN14btOptimizedBvh5buildEP23btStridingMeshInterfacebRK9btVector3S4_EN29QuantizedNodeTriangleCallback28internalProcessTriangleIndexEPS2_ii(sp)
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
var __label__ = 0;
	i7 = sp + -64;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	if(r0 <1024) //_LBB469_2
{
	r1 = heap32[(fp+3)];
	if(r1 <2097152) //_LBB469_4
{
	if(r1 >-1) //_LBB469_6
{
	r2 = heap32[(fp)];
	r3 = heap32[(fp+1)];
	r4 = sp + -32;
	r5 = r4 >> 2;
	heap32[(fp+-8)] = 1566444395;
	heap32[(r5+1)] = 1566444395;
	heap32[(r5+2)] = 1566444395;
	r6 = sp + -48;
	heap32[(r5+3)] = 0;
	r7 = r6 >> 2;
	heap32[(fp+-12)] = -581039253;
	heap32[(r7+1)] = -581039253;
	heap32[(r7+2)] = -581039253;
	r3 = r3 >> 2;
	heap32[(r7+3)] = 0;
	f0 = heapFloat[(r3)];
	f1 =        999999984306749440;
	if(f0 <f1) //_LBB469_8
{
	heapFloat[(fp+-8)] = f0;
	f2 = f0;
}
else{
	f2 = f1;
}
	f3 = heapFloat[(r3+1)];
	if(f3 <f1) //_LBB469_11
{
	heapFloat[(r5+1)] = f3;
	f1 = f3;
}
else{
	f1 =        999999984306749440;
}
	f4 = heapFloat[(r3+2)];
	f5 =        999999984306749440;
	if(f4 <f5) //_LBB469_14
{
	heapFloat[(r5+2)] = f4;
	f5 = f4;
}
	f6 = heapFloat[(r3+3)];
	f7 =                         0;
	if(f6 <f7) //_LBB469_17
{
	heapFloat[(r5+3)] = f6;
	f7 = f6;
}
	f8 =       -999999984306749440;
	if(f0 >f8) //_LBB469_20
{
	heapFloat[(fp+-12)] = f0;
}
else{
	f0 = f8;
}
	if(f3 >f8) //_LBB469_23
{
	heapFloat[(r7+1)] = f3;
}
else{
	f3 =       -999999984306749440;
}
	f8 =       -999999984306749440;
	if(f4 >f8) //_LBB469_26
{
	heapFloat[(r7+2)] = f4;
	f8 = f4;
}
	f4 =                         0;
	if(f6 >f4) //_LBB469_29
{
	heapFloat[(r7+3)] = f6;
	f4 = f6;
}
	f6 = heapFloat[(r3+4)];
	if(f6 <f2) //_LBB469_32
{
	heapFloat[(fp+-8)] = f6;
	f2 = f6;
}
	f9 = heapFloat[(r3+5)];
	if(f9 <f1) //_LBB469_35
{
	heapFloat[(r5+1)] = f9;
	f1 = f9;
}
	f10 = heapFloat[(r3+6)];
	if(f10 <f5) //_LBB469_38
{
	heapFloat[(r5+2)] = f10;
	f5 = f10;
}
	f11 = heapFloat[(r3+7)];
	if(f11 <f7) //_LBB469_41
{
	heapFloat[(r5+3)] = f11;
	f7 = f11;
}
	if(f0 <f6) //_LBB469_44
{
	heapFloat[(fp+-12)] = f6;
	f0 = f6;
}
	if(f3 <f9) //_LBB469_47
{
	heapFloat[(r7+1)] = f9;
	f3 = f9;
}
	if(f8 <f10) //_LBB469_50
{
	heapFloat[(r7+2)] = f10;
	f8 = f10;
}
	if(f4 <f11) //_LBB469_53
{
	heapFloat[(r7+3)] = f11;
	f4 = f11;
}
	f6 = heapFloat[(r3+8)];
	if(f6 <f2) //_LBB469_56
{
	heapFloat[(fp+-8)] = f6;
	f2 = f6;
}
	f9 = heapFloat[(r3+9)];
	if(f9 <f1) //_LBB469_59
{
	heapFloat[(r5+1)] = f9;
	f1 = f9;
}
	f10 = heapFloat[(r3+10)];
	if(f10 <f5) //_LBB469_62
{
	heapFloat[(r5+2)] = f10;
	f5 = f10;
}
	f11 = heapFloat[(r3+11)];
if(!(f11 >=f7)) //_LBB469_65
{
	heapFloat[(r5+3)] = f11;
}
	if(f0 <f6) //_LBB469_67
{
	heapFloat[(fp+-12)] = f6;
	f0 = f6;
}
	if(f3 <f9) //_LBB469_70
{
	heapFloat[(r7+1)] = f9;
	f3 = f9;
}
	if(f8 <f10) //_LBB469_73
{
	heapFloat[(r7+2)] = f10;
	f8 = f10;
}
if(!(f4 >=f11)) //_LBB469_76
{
	heapFloat[(r7+3)] = f11;
}
	f4 = f0-f2;
	f6 =     0.0020000000949949026;
if(!(f4 >=f6)) //_LBB469_78
{
	f4 =     0.0010000000474974513;
	f0 = f0+f4;
	f4 =    -0.0010000000474974513;
	f2 = f2+f4;
	heapFloat[(fp+-12)] = f0;
	heapFloat[(fp+-8)] = f2;
}
	f0 = f3-f1;
if(!(f0 >=f6)) //_LBB469_80
{
	f0 =     0.0010000000474974513;
	f2 =    -0.0010000000474974513;
	f0 = f3+f0;
	f1 = f1+f2;
	heapFloat[(r7+1)] = f0;
	heapFloat[(r5+1)] = f1;
}
	f0 = f8-f5;
if(!(f0 >=f6)) //_LBB469_82
{
	f0 =     0.0010000000474974513;
	f1 =    -0.0010000000474974513;
	f0 = f8+f0;
	f1 = f5+f1;
	heapFloat[(r7+2)] = f0;
	heapFloat[(r5+2)] = f1;
}
	r2 = r2 >> 2;
	r3 = heap32[(r2+2)];
	r5 = sp + -16;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = 0;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
	r3 = heap32[(r2+2)];
	r4 = (r5 + 6)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = 1;
	r0 = r0 << 21;
	r0 = r0 | r1;
	_ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(i7);
	r1 = r5 >> 2;
	heap32[(r1+3)] = r0;
	r1 = heap32[(r2+1)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+1)];
	r4 = heap32[(r2+2)];
	if(r4 ==r3) //_LBB469_84
{
	r4 = 1;
	r5 = r3 << 1;
	r3 = r3 == 0 ? r4 : r5;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r3;
	_ZN20btAlignedObjectArrayI18btQuantizedBvhNodeE7reserveEi(i7);
	r3 = heap32[(r2+1)];
}
	r1 = heap32[(r2+3)];
	r4 = heapU16[(sp+-16)>>1];
	r3 = r3 << 4;
	heap16[(r1+r3)>>1] = r4;
	r1 = (r1 + r3)|0;
	r3 = heapU16[(sp+-14)>>1];
	heap16[(r1+2)>>1] = r3;
	r3 = heapU16[(sp+-12)>>1];
	heap16[(r1+4)>>1] = r3;
	r3 = heapU16[(sp+-10)>>1];
	heap16[(r1+6)>>1] = r3;
	r3 = heapU16[(sp+-8)>>1];
	heap16[(r1+8)>>1] = r3;
	r3 = heapU16[(sp+-6)>>1];
	r4 = r1 >> 2;
	heap16[(r1+10)>>1] = r3;
	heap32[(r4+3)] = r0;
	r0 = heap32[(r2+1)];
	r0 = (r0 + 1)|0;
	heap32[(r2+1)] = r0;
	return;
}
else{
	r0 = _2E_str20316;
	r1 = _2E_str10306;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 103;
	_assert(i7);
}
}
else{
	r0 = _2E_str19315;
	r1 = _2E_str10306;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 101;
	_assert(i7);
}
}
else{
	r0 = _2E_str18314;
	r1 = _2E_str10306;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 100;
	_assert(i7);
}
}