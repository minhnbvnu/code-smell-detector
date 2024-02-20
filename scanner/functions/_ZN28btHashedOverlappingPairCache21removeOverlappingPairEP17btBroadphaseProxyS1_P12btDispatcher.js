function _ZN28btHashedOverlappingPairCache21removeOverlappingPairEP17btBroadphaseProxyS1_P12btDispatcher(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = gRemovePairs;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+1)];
	r1 = (r1 + 1)|0;
	r4 = r3 >> 2;
	heap32[(r0)] = r1;
	r0 = r2 >> 2;
	r1 = heap32[(r4+3)];
	r0 = heap32[(r0+3)];
	r4 = r1 > r0 ? r3 : r2;
	r0 = r1 > r0 ? r2 : r3;
	r1 = r4 >> 2;
	r1 = heap32[(r1+3)];
	r2 = r0 >> 2;
	r2 = heap32[(r2+3)];
	r3 = r1 << 16;
	r3 = r3 | r2;
	r5 = r3 << 15;
	r5 = r5 ^ -1;
	r3 = (r3 + r5)|0;
	r5 = r3 >> 10;
	r3 = r5 ^ r3;
	r3 = (r3 * 9)|0;
	r5 = r3 >> 6;
	r3 = r5 ^ r3;
	r5 = r3 << 11;
	r6 = heap32[(fp)];
	r5 = r5 ^ -1;
	r7 = r6 >> 2;
	r3 = (r3 + r5)|0;
	r5 = r3 >> 16;
	r8 = heap32[(r7+3)];
	r3 = r5 ^ r3;
	r5 = (r8 + -1)|0;
	r3 = r3 & r5;
	r5 = heap32[(r7+11)];
	r3 = r3 << 2;
	r8 = heap32[(fp+3)];
	r5 = (r5 + r3)|0;
_1: while(true){
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	if(r5 ==-1) //_LBB136_35
{
__label__ = 33;
break _1;
}
else{
	r9 = heap32[(r7+4)];
	r10 = r5 << 4;
	r9 = (r9 + r10)|0;
	r10 = r9 >> 2;
	r11 = heap32[(r10)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+3)];
if(!(r11 !=r2)) //_LBB136_1
{
	r11 = heap32[(r10+1)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+3)];
if(!(r11 !=r1)) //_LBB136_1
{
__label__ = 5;
break _1;
}
}
	r9 = heap32[(r7+16)];
	r5 = r5 << 2;
	r5 = (r9 + r5)|0;
continue _1;
}
}
if (__label__ == 5){
	r11 = heap32[(r7+2)];
	if(r11 >r5) //_LBB136_7
{
if(!(r9 ==0)) //_LBB136_35
{
	r5 = heap32[(r7)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+8)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r8;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r5 = heap32[(r10)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+3)];
	if(r5 ==r2) //_LBB136_10
{
	r2 = heap32[(r10+1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+3)];
	if(r2 ==r1) //_LBB136_12
{
	r1 = heap32[(r7+4)];
	r1 = (r9 - r1)|0;
	r1 = r1 >> 4;
	r2 = heap32[(r7+2)];
	if(r2 >r1) //_LBB136_14
{
	r2 = heap32[(r7+11)];
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r3 = heap32[(r2)];
	if(r3 ==-1) //_LBB136_17
{
	r0 = _2E_str727;
	r1 = _2E_str121;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 304;
	_assert(i7);
}
else{
	r5 = heap32[(r10+3)];
	r6 = heap32[(r7+16)];
	if(r3 ==r1) //_LBB136_21
{
__label__ = 20;
}
else{
_22: while(true){
	r9 = r3;
	r3 = r9 << 2;
	r3 = (r6 + r3)|0;
	r10 = r3 >> 2;
	r3 = heap32[(r10)];
if(!(r3 !=r1)) //_LBB136_18
{
break _22;
}
}
	if(r9 ==-1) //_LBB136_21
{
__label__ = 20;
}
else{
	r2 = r1 << 2;
	r2 = (r6 + r2)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	heap32[(r10)] = r2;
__label__ = 21;
}
}
if (__label__ == 20){
	r3 = r1 << 2;
	r3 = (r6 + r3)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(r2)] = r3;
}
	r2 = heap32[(r7+2)];
	r3 = heap32[(r7+18)];
if(!(r3 ==0)) //_LBB136_24
{
	r6 = r3 >> 2;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+3)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r8;
	__FUNCTION_TABLE__[(r6)>>2](i7);
}
	r0 = (r2 + -1)|0;
	if(r0 !=r1) //_LBB136_26
{
	r3 = heap32[(r7+4)];
	r4 = r2 << 4;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r6 = heap32[(r3+-3)];
	r3 = heap32[(r3+-4)];
	r6 = r6 >> 2;
	r3 = r3 >> 2;
	r6 = heap32[(r6+3)];
	r3 = heap32[(r3+3)];
	r6 = r6 << 16;
	r3 = r3 | r6;
	r6 = r3 << 15;
	r6 = r6 ^ -1;
	r3 = (r3 + r6)|0;
	r6 = r3 >> 10;
	r3 = r6 ^ r3;
	r3 = (r3 * 9)|0;
	r6 = r3 >> 6;
	r3 = r6 ^ r3;
	r6 = r3 << 11;
	r6 = r6 ^ -1;
	r3 = (r3 + r6)|0;
	r6 = r3 >> 16;
	r8 = heap32[(r7+3)];
	r3 = r6 ^ r3;
	r6 = (r8 + -1)|0;
	r3 = r3 & r6;
	r6 = heap32[(r7+11)];
	r3 = r3 << 2;
	r6 = (r6 + r3)|0;
	r6 = r6 >> 2;
	r8 = heap32[(r6)];
	if(r8 ==-1) //_LBB136_29
{
	r0 = _2E_str727;
	r1 = _2E_str121;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 345;
	_assert(i7);
}
else{
	r9 = heap32[(r7+16)];
	if(r8 ==r0) //_LBB136_33
{
__label__ = 31;
}
else{
_38: while(true){
	r10 = r8;
	r8 = r10 << 2;
	r8 = (r9 + r8)|0;
	r11 = r8 >> 2;
	r8 = heap32[(r11)];
if(!(r8 !=r0)) //_LBB136_30
{
break _38;
}
}
	if(r10 ==-1) //_LBB136_33
{
__label__ = 31;
}
else{
	r2 = r2 << 2;
	r2 = (r9 + r2)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2+-1)];
	heap32[(r11)] = r2;
__label__ = 32;
}
}
if (__label__ == 31){
	r0 = r2 << 2;
	r0 = (r9 + r0)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+-1)];
	heap32[(r6)] = r0;
}
	r0 = heap32[(r7+4)];
	r2 = (r0 + r4)|0;
	r4 = r1 << 4;
	r2 = r2 >> 2;
	r0 = (r0 + r4)|0;
	r4 = heap32[(r2+-4)];
	r0 = r0 >> 2;
	heap32[(r0)] = r4;
	r4 = heap32[(r2+-3)];
	heap32[(r0+1)] = r4;
	r4 = heap32[(r2+-2)];
	heap32[(r0+2)] = r4;
	r2 = heap32[(r2+-1)];
	heap32[(r0+3)] = r2;
	r0 = heap32[(r7+11)];
	r0 = (r0 + r3)|0;
	r0 = r0 >> 2;
	r2 = r1 << 2;
	r4 = heap32[(r7+16)];
	r2 = (r4 + r2)|0;
	r0 = heap32[(r0)];
	r2 = r2 >> 2;
	heap32[(r2)] = r0;
	r0 = heap32[(r7+11)];
	r0 = (r0 + r3)|0;
	r0 = r0 >> 2;
	heap32[(r0)] = r1;
}
}
	r0 = heap32[(r7+2)];
	r0 = (r0 + -1)|0;
	heap32[(r7+2)] = r0;
	r_g0 = r5;
	return;
}
}
else{
	r0 = _2E_str626;
	r1 = _2E_str121;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 300;
	_assert(i7);
}
}
else{
	r0 = _2E_str525;
	r3 = _2E_str121;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 297;
	_assert(i7);
}
}
else{
	r0 = _2E_str424;
	r1 = _2E_str121;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 296;
	_assert(i7);
}
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
}
	r0 = 0;
	r_g0 = r0;
	return;
}