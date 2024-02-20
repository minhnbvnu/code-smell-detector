function _ZN22btBvhTriangleMeshShape17buildOptimizedBvhEv(sp)
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
var __label__ = 0;
	i7 = sp + -72;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+61];
if(!(r1 ==0)) //_LBB410_3
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+13)];
	r3 = r2 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = heap32[(r1+13)];
if(!(r1 ==0)) //_LBB410_3
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	r3 = (r3 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r2)] = r3;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
}
	r1 = gNumAlignedAllocs;
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + 1)|0;
	heap32[(r1)] = r2;
	heap32[(g0)] = 191;
	malloc(i7);
	r2 = r_g0;
	if(r2 !=0) //_LBB410_5
{
	r3 = 0;
	r4 = (r2 + 4)|0;
	r3 = (r3 - r4)|0;
	r3 = r3 & 15;
	r3 = (r2 + r3)|0;
	r4 = (r3 + 4)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = r2;
	r2 = r4;
}
	r3 = r2 >> 2;
	r4 = 1;
	heap32[(r3+13)] = 277;
	heap8[r2+80] = r4;
	heap32[(r3+19)] = 0;
	heap32[(r3+17)] = 0;
	heap32[(r3+18)] = 0;
	heap8[r2+100] = r4;
	heap32[(r3+24)] = 0;
	heap32[(r3+22)] = 0;
	heap32[(r3+23)] = 0;
	heap8[r2+120] = r4;
	heap32[(r3+29)] = 0;
	heap32[(r3+27)] = 0;
	heap32[(r3+28)] = 0;
	heap8[r2+140] = r4;
	heap32[(r3+34)] = 0;
	heap32[(r3+32)] = 0;
	heap32[(r3+33)] = 0;
	heap32[(r3+36)] = 0;
	heap8[r2+164] = r4;
	heap32[(r3+40)] = 0;
	heap32[(r3+38)] = 0;
	heap32[(r3+39)] = 0;
	heap32[(r3+42)] = 0;
	heap32[(r3+1)] = -8388609;
	heap32[(r3+2)] = -8388609;
	heap32[(r3+3)] = -8388609;
	heap32[(r3+4)] = 0;
	heap32[(r3+5)] = 2139095039;
	heap32[(r3+6)] = 2139095039;
	r5 = _ZTV14btOptimizedBvh;
	heap32[(r3+7)] = 2139095039;
	r5 = (r5 + 8)|0;
	heap32[(r3+8)] = 0;
	r6 = r0 >> 2;
	heap32[(r3)] = r5;
	heap32[(r6+13)] = r2;
	r5 = heap32[(r6+12)];
	r7 = heapU8[r0+60];
	heap8[r2+60] = r7;
	if(r7 ==0) //_LBB410_11
{
	r6 = _ZTVZN14btOptimizedBvh5buildEP23btStridingMeshInterfacebRK9btVector3S4_E20NodeTriangleCallback;
	r7 = sp + -24;
	r6 = (r6 + 8)|0;
	r8 = r7 >> 2;
	r9 = (r2 + 64)|0;
	heap32[(fp+-6)] = r6;
	r6 = sp + -40;
	heap32[(r8+1)] = r9;
	r8 = r6 >> 2;
	heap32[(fp+-10)] = -581039253;
	heap32[(r8+1)] = -581039253;
	heap32[(r8+2)] = -581039253;
	r9 = sp + -56;
	heap32[(r8+3)] = 0;
	r8 = r9 >> 2;
	heap32[(fp+-14)] = 1566444395;
	heap32[(r8+1)] = 1566444395;
	heap32[(r8+2)] = 1566444395;
	r10 = r5 >> 2;
	heap32[(r8+3)] = 0;
	r8 = heap32[(r10)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r9;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r5 = heap32[(r3+17)];
	r6 = heap32[(r3+22)];
	r7 = r5 << 1;
if(!(r6 >=r7)) //_LBB410_26
{
	r8 = heap32[(r3+23)];
if(!(r8 >=r7)) //_LBB410_26
{
	if(r7 !=0) //_LBB410_15
{
	r8 = heap32[(r1)];
	r8 = (r8 + 1)|0;
	r9 = r5 << 7;
	heap32[(r1)] = r8;
	r8 = r9 | 19;
	heap32[(g0)] = r8;
	malloc(i7);
	r8 = r_g0;
	if(r8 !=0) //_LBB410_17
{
	r9 = 0;
	r10 = (r8 + 4)|0;
	r9 = (r9 - r10)|0;
	r9 = r9 & 15;
	r9 = (r8 + r9)|0;
	r10 = (r9 + 4)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r8;
	r8 = r10;
}
}
else{
	r8 = 0;
}
if(!(r6 <1)) //_LBB410_21
{
	r9 = 0;
_20: while(true){
	r10 = heap32[(r3+24)];
	r11 = (r8 + r9)|0;
	r10 = (r10 + r9)|0;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = 64;
	r6 = (r6 + -1)|0;
	r9 = (r9 + 64)|0;
	memcpy(i7);
if(!(r6 !=0)) //_LBB410_20
{
break _20;
}
}
}
	r6 = heap32[(r3+24)];
if(!(r6 ==0)) //_LBB410_25
{
	r9 = heapU8[r2+100];
if(!(r9 ==0)) //_LBB410_24
{
	r9 = gNumAlignedFree;
	r9 = r9 >> 2;
	r10 = heap32[(r9)];
	r10 = (r10 + 1)|0;
	r6 = r6 >> 2;
	heap32[(r9)] = r10;
	r6 = heap32[(r6+-1)];
	heap32[(g0)] = r6;
	free(i7);
}
	heap32[(r3+24)] = 0;
}
	r6 = 1;
	heap8[r2+100] = r6;
	heap32[(r3+24)] = r8;
	heap32[(r3+23)] = r7;
}
}
	r6 = _ZTV31btInternalTriangleIndexCallback;
	r6 = (r6 + 8)|0;
	heap32[(r3+22)] = r7;
	heap32[(fp+-6)] = r6;
}
else{
	r7 = (r2 + 4)|0;
	r8 = (r2 + 20)|0;
	f0 =                        -1;
	f1 = heapFloat[(r6+6)];
	f2 = heapFloat[(r6+5)];
	f3 = heapFloat[(r6+4)];
	f3 = f3+f0;
	f2 = f2+f0;
	heapFloat[(r3+1)] = f3;
	f0 = f1+f0;
	heapFloat[(r3+2)] = f2;
	heapFloat[(r3+3)] = f0;
	heap32[(r3+4)] = 0;
	f1 =                         1;
	f4 = heapFloat[(r6+10)];
	f5 = heapFloat[(r6+9)];
	f6 = heapFloat[(r6+8)];
	f6 = f6+f1;
	f5 = f5+f1;
	heapFloat[(r3+5)] = f6;
	f1 = f4+f1;
	heapFloat[(r3+6)] = f5;
	heapFloat[(r3+7)] = f1;
	f4 =                     65533;
	f3 = f6-f3;
	f2 = f5-f2;
	f3 = f4/f3;
	heap32[(r3+8)] = 0;
	f0 = f1-f0;
	f1 = f4/f2;
	heapFloat[(r3+9)] = f3;
	f0 = f4/f0;
	heapFloat[(r3+10)] = f1;
	heapFloat[(r3+11)] = f0;
	r6 = _ZTVZN14btOptimizedBvh5buildEP23btStridingMeshInterfacebRK9btVector3S4_E29QuantizedNodeTriangleCallback;
	heap32[(r3+12)] = 0;
	r9 = sp + -16;
	r6 = (r6 + 8)|0;
	heap8[r2+60] = r4;
	r10 = r9 >> 2;
	r11 = (r2 + 104)|0;
	heap32[(fp+-4)] = r6;
	heap32[(r10+1)] = r11;
	r6 = r5 >> 2;
	heap32[(r10+2)] = r2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+2)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r7;
	heap32[(g0+3)] = r8;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r5 = heap32[(r3+27)];
	r6 = heap32[(r3+32)];
	r7 = r5 << 1;
_31: do {
if(!(r6 >=r7)) //_LBB410_10
{
	r8 = (r2 + 124)|0;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r7;
	r8 = (r7 - r6)|0;
	r6 = r6 << 4;
	_ZN20btAlignedObjectArrayI18btQuantizedBvhNodeE7reserveEi(i7);
_33: while(true){
	r9 = heap32[(r3+34)];
	r9 = (r9 + r6)|0;
	r9 = r9 >> 2;
	r8 = (r8 + -1)|0;
	r6 = (r6 + 16)|0;
	heap32[(r9)] = 0;
	heap32[(r9+1)] = 0;
	heap32[(r9+2)] = 0;
	heap32[(r9+3)] = 0;
if(!(r8 !=0)) //_LBB410_9
{
break _31;
}
}
}
} while(0);
	r6 = _ZTV31btInternalTriangleIndexCallback;
	r6 = (r6 + 8)|0;
	heap32[(r3+32)] = r7;
	heap32[(fp+-4)] = r6;
}
	heap32[(r3+14)] = 0;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = 0;
	heap32[(g0+2)] = r5;
	_ZN14btQuantizedBvh9buildTreeEii(i7);
	r5 = heapU8[r2+60];
if(!(r5 ==0)) //_LBB410_41
{
	r5 = heap32[(r3+38)];
if(!(r5 !=0)) //_LBB410_41
{
	r6 = heap32[(r3+39)];
	if(r6 !=r5) //_LBB410_31
{
__label__ = 29;
}
else{
	if(r6 <1) //_LBB410_32
{
	r6 = heap32[(r1)];
	r6 = (r6 + 1)|0;
	heap32[(r1)] = r6;
	heap32[(g0)] = 51;
	malloc(i7);
	r1 = r_g0;
	if(r1 !=0) //_LBB410_34
{
	r6 = 0;
	r7 = (r1 + 4)|0;
	r6 = (r6 - r7)|0;
	r6 = r6 & 15;
	r6 = (r1 + r6)|0;
	r7 = (r6 + 4)|0;
	r6 = r6 >> 2;
	heap32[(r6)] = r1;
	r1 = r7;
}
	r6 = heap32[(r3+40)];
if(!(r6 ==0)) //_LBB410_39
{
	r7 = heapU8[r2+164];
if(!(r7 ==0)) //_LBB410_38
{
	r7 = gNumAlignedFree;
	r7 = r7 >> 2;
	r8 = heap32[(r7)];
	r8 = (r8 + 1)|0;
	r6 = r6 >> 2;
	heap32[(r7)] = r8;
	r6 = heap32[(r6+-1)];
	heap32[(g0)] = r6;
	free(i7);
}
	heap32[(r3+40)] = 0;
}
	r6 = 1;
	heap8[r2+164] = r6;
	heap32[(r3+40)] = r1;
	heap32[(r3+39)] = 1;
	r6 = heap32[(r3+38)];
	r6 = (r6 + 1)|0;
__label__ = 37;
}
else{
__label__ = 29;
}
}
if (__label__ == 29){
	r1 = heap32[(r3+40)];
	r6 = r4;
}
	heap32[(r3+38)] = r6;
	r6 = heap32[(r3+34)];
	r7 = heapU16[(r6)>>1];
	r5 = r5 << 5;
	heap16[(r1+r5)>>1] = r7;
	r1 = (r1 + r5)|0;
	r5 = heapU16[(r6+2)>>1];
	heap16[(r1+2)>>1] = r5;
	r5 = heapU16[(r6+4)>>1];
	heap16[(r1+4)>>1] = r5;
	r5 = heapU16[(r6+6)>>1];
	heap16[(r1+6)>>1] = r5;
	r5 = heapU16[(r6+8)>>1];
	heap16[(r1+8)>>1] = r5;
	r5 = heapU16[(r6+10)>>1];
	r6 = r1 >> 2;
	heap16[(r1+10)>>1] = r5;
	heap32[(r6+3)] = 0;
	r1 = heap32[(r3+34)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+3)];
	r5 = 0;
	r5 = (r5 - r1)|0;
	r1 = r1 < 0 ? r5 : r4;
	heap32[(r6+4)] = r1;
}
}
	r1 = heap32[(r3+38)];
	heap32[(r3+42)] = r1;
	r1 = heap32[(r3+29)];
if(!(r1 ==0)) //_LBB410_45
{
	r4 = heapU8[r2+120];
if(!(r4 ==0)) //_LBB410_44
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r4)] = r5;
	r1 = heap32[(r1+-1)];
	heap32[(g0)] = r1;
	free(i7);
}
	heap32[(r3+29)] = 0;
}
	r1 = 1;
	heap8[r2+120] = r1;
	heap32[(r3+29)] = 0;
	heap32[(r3+27)] = 0;
	heap32[(r3+28)] = 0;
	r4 = heap32[(r3+19)];
if(!(r4 ==0)) //_LBB410_49
{
	r5 = heapU8[r2+80];
if(!(r5 ==0)) //_LBB410_48
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r6 = heap32[(r5)];
	r6 = (r6 + 1)|0;
	r4 = r4 >> 2;
	heap32[(r5)] = r6;
	r4 = heap32[(r4+-1)];
	heap32[(g0)] = r4;
	free(i7);
}
	heap32[(r3+19)] = 0;
}
	heap8[r2+80] = r1;
	heap32[(r3+19)] = 0;
	heap32[(r3+17)] = 0;
	heap32[(r3+18)] = 0;
	heap8[r0+61] = r1;
	return;
}