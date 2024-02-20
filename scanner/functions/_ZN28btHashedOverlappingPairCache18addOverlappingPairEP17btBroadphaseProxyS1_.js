function _ZN28btHashedOverlappingPairCache18addOverlappingPairEP17btBroadphaseProxyS1_(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = gAddedPairs;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = heap32[(fp)];
	r1 = (r1 + 1)|0;
	r3 = r2 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r3+6)];
	r1 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	if(r0 ==0) //_LBB135_2
{
	r0 = heapU16[(r4+6)>>1];
	r5 = heapU16[(r1+4)>>1];
	r0 = r0 & r5;
	r0 = r0 & 65535;
	if(r0 ==0) //_LBB135_25
{
__label__ = 23;
}
else{
	r0 = heapU16[(r1+6)>>1];
	r5 = heapU16[(r4+4)>>1];
	r0 = r0 & r5;
	r0 = r0 & 65535;
	r5 = 0;
	r0 = r0 != r5;
	r0 = r0 & 1;
__label__ = 4;
}
}
else{
	r5 = r0 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+2)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r4;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r0 = r_g0;
__label__ = 4;
}
if (__label__ == 4){
	r0 = r0 & 255;
if(!(r0 ==0)) //_LBB135_25
{
	r0 = r1 >> 2;
	r5 = r4 >> 2;
	r0 = heap32[(r0+3)];
	r5 = heap32[(r5+3)];
	r6 = r0 > r5 ? r1 : r4;
	r0 = r0 > r5 ? r4 : r1;
	r1 = r6 >> 2;
	r4 = heap32[(r1+3)];
	r5 = r0 >> 2;
	r7 = heap32[(r5+3)];
	r8 = r4 << 16;
	r8 = r8 | r7;
	r9 = r8 << 15;
	r9 = r9 ^ -1;
	r8 = (r8 + r9)|0;
	r9 = r8 >> 10;
	r8 = r9 ^ r8;
	r8 = (r8 * 9)|0;
	r9 = r8 >> 6;
	r8 = r9 ^ r8;
	r9 = r8 << 11;
	r9 = r9 ^ -1;
	r8 = (r8 + r9)|0;
	r9 = heap32[(r3+3)];
	r10 = r8 >> 16;
	r8 = r10 ^ r8;
	r10 = (r9 + -1)|0;
	r10 = r8 & r10;
	r11 = heap32[(r3+11)];
	r12 = r10 << 2;
	r11 = (r11 + r12)|0;
_8: while(true){
	r11 = r11 >> 2;
	r11 = heap32[(r11)];
	if(r11 ==-1) //_LBB135_14
{
__label__ = 13;
break _8;
}
else{
	r12 = heap32[(r3+4)];
	r13 = r11 << 4;
	r12 = (r12 + r13)|0;
	r13 = r12 >> 2;
	r14 = heap32[(r13)];
	r14 = r14 >> 2;
	r14 = heap32[(r14+3)];
if(!(r14 !=r7)) //_LBB135_6
{
	r13 = heap32[(r13+1)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+3)];
if(!(r13 !=r4)) //_LBB135_6
{
__label__ = 10;
break _8;
}
}
	r12 = heap32[(r3+16)];
	r11 = r11 << 2;
	r11 = (r12 + r11)|0;
}
}
_14: do {
switch(__label__ ){//multiple entries
case 13:
	r4 = heap32[(r3+2)];
__label__ = 14;
break _14;
break;
case 10:
	r4 = heap32[(r3+2)];
	if(r4 >r11) //_LBB135_12
{
	if(r12 !=0) //_LBB135_24
{
__label__ = 22;
}
else{
__label__ = 14;
}
}
else{
	r0 = _2E_str222;
	r1 = _2E_str323;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 250;
	_assert(i7);
}
break;
}
} while(0);
if (__label__ == 14){
	r12 = (r2 + 4)|0;
	heap32[(g0)] = r12;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE21expandNonInitializingEv(i7);
	r12 = r_g0;
	r7 = heap32[(r3+18)];
if(!(r7 ==0)) //_LBB135_17
{
	r11 = r7 >> 2;
	r11 = heap32[(r11)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+2)];
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r6;
	__FUNCTION_TABLE__[(r11)>>2](i7);
}
	r7 = heap32[(r3+3)];
	if(r9 <r7) //_LBB135_19
{
	heap32[(g0)] = r2;
	_ZN28btHashedOverlappingPairCache10growTablesEv(i7);
	r10 = heap32[(r3+3)];
	r10 = (r10 + -1)|0;
	r10 = r10 & r8;
}
	r2 = heap32[(r5+3)];
	r1 = heap32[(r1+3)];
	if(r2 >=r1) //_LBB135_22
{
	r1 = r12 >> 2;
	heap32[(r1)] = r6;
	heap32[(r1+1)] = r0;
}
else{
	r1 = r12 >> 2;
	heap32[(r1)] = r0;
	heap32[(r1+1)] = r6;
}
	r0 = r12 >> 2;
	heap32[(r0+2)] = 0;
	heap32[(r0+3)] = 0;
	r0 = r10 << 2;
	r1 = heap32[(r3+11)];
	r1 = (r1 + r0)|0;
	r1 = r1 >> 2;
	r2 = r4 << 2;
	r5 = heap32[(r3+16)];
	r2 = (r5 + r2)|0;
	r1 = heap32[(r1)];
	r2 = r2 >> 2;
	heap32[(r2)] = r1;
	r1 = heap32[(r3+11)];
	r0 = (r1 + r0)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r4;
}
	r_g0 = r12;
	return;
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}