function _ZNK34btClosestNotMeConvexResultCallback14needsCollisionEP17btBroadphaseProxy(sp)
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
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = r1 >> 2;
	r3 = r0 >> 2;
	r2 = heap32[(r2)];
	r4 = heap32[(r3+20)];
	if(r2 !=r4) //_LBB635_2
{
	r5 = heapU16[(r0+10)>>1];
	r6 = heapU16[(r1+4)>>1];
	r5 = r5 & r6;
	r5 = r5 & 65535;
	if(r5 ==0) //_LBB635_1
{
__label__ = 1;
}
else{
	r5 = heapU16[(r1+6)>>1];
	r0 = heapU16[(r0+8)>>1];
	r0 = r5 & r0;
	r0 = r0 & 65535;
	if(r0 ==0) //_LBB635_1
{
__label__ = 1;
}
else{
	r0 = heap32[(r3+23)];
	r5 = r0 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+7)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r0 = r_g0;
	if(r0 !=0) //_LBB635_6
{
	r0 = sp + -24;
	r2 = 1;
	r4 = r0 >> 2;
	heap8[sp+-8] = r2;
	heap32[(r4+3)] = 0;
	heap32[(r4+1)] = 0;
	heap32[(r4+2)] = 0;
	r5 = heap32[(r3+22)];
	r6 = r5 >> 2;
	r6 = heap32[(r6)];
	r3 = heap32[(r3+20)];
	r6 = r6 >> 2;
	r3 = r3 >> 2;
	r6 = heap32[(r6+13)];
	r3 = heap32[(r3+47)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r1;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r1 = r_g0;
_7: do {
if(!(r1 ==0)) //_LBB635_21
{
	r1 = r1 >> 2;
	r3 = heap32[(r1+2)];
if(!(r3 ==0)) //_LBB635_21
{
	r3 = heap32[(r4+1)];
if(!(r3 >-1)) //_LBB635_17
{
	r5 = heap32[(r4+2)];
	if(r5 <0) //_LBB635_11
{
	r5 = heap32[(r4+3)];
if(!(r5 ==0)) //_LBB635_15
{
	r6 = heapU8[sp+-8];
if(!(r6 ==0)) //_LBB635_14
{
	r6 = gNumAlignedFree;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
	r7 = (r7 + 1)|0;
	r5 = r5 >> 2;
	heap32[(r6)] = r7;
	r5 = heap32[(r5+-1)];
	heap32[(g0)] = r5;
	free(i7);
}
	heap32[(r4+3)] = 0;
}
	heap8[sp+-8] = r2;
	heap32[(r4+3)] = 0;
	heap32[(r4+2)] = 0;
}
_20: while(true){
	r2 = r3 << 2;
	r5 = heap32[(r4+3)];
	r2 = (r5 + r2)|0;
	r3 = (r3 + 1)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = 0;
if(!(r3 !=0)) //_LBB635_16
{
break _20;
}
}
}
	heap32[(r4+1)] = 0;
	r1 = heap32[(r1+2)];
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = heap32[(r4+1)];
	r1 = 0;
_23: while(true){
	if(r0 >r1) //_LBB635_18
{
	r2 = heap32[(r4+3)];
	r3 = r1 << 2;
	r3 = (r2 + r3)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+279)];
	if(r3 >0) //_LBB635_25
{
break _23;
}
else{
	r1 = (r1 + 1)|0;
}
}
else{
break _7;
}
}
if(!(r2 ==0)) //_LBB635_29
{
	r0 = heapU8[sp+-8];
if(!(r0 ==0)) //_LBB635_28
{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	r2 = r2 >> 2;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}
}
} while(0);
	r0 = heap32[(r4+3)];
if(!(r0 ==0)) //_LBB635_24
{
	r2 = heapU8[sp+-8];
if(!(r2 ==0)) //_LBB635_24
{
	r2 = gNumAlignedFree;
	r2 = r2 >> 2;
	r1 = heap32[(r2)];
	r1 = (r1 + 1)|0;
	r0 = r0 >> 2;
	heap32[(r2)] = r1;
	r0 = heap32[(r0+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
}
	r0 = 1;
	r_g0 = r0;
	return;
}
else{
	r0 = 1;
__label__ = 28;
}
}
}
}
else{
__label__ = 1;
}
if (__label__ == 1){
	r0 = 0;
}
	r0 = r0 & 255;
	r_g0 = r0;
	return;
}