function _ZN20btAxisSweep3InternalItE8aabbTestERK9btVector3S3_R24btBroadphaseAabbCallback(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+27)];
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	if(r2 !=0) //_LBB56_2
{
	r0 = r2 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+7)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	return;
}
else{
	r2 = heapU16[(r0+56)>>1];
	r2 = r2 << 1;
	r2 = r2 | 1;
if(!(r2 ==1)) //_LBB56_18
{
	r2 = 1;
	r6 = 2;
_6: while(true){
	r7 = r6;
	r6 = r2 & 65535;
	r8 = heap32[(r1+17)];
	r6 = r6 << 2;
	r9 = heapU8[r8+r6];
	r9 = r9 & 1;
if(!(r9 ==0)) //_LBB56_17
{
	r6 = (r8 + r6)|0;
	r6 = heapU16[(r6+2)>>1];
	r8 = heap32[(r1+15)];
	r6 = r6 << 6;
	r6 = (r8 + r6)|0;
	r8 = r3 >> 2;
	r9 = r6 >> 2;
	f0 = heapFloat[(r8)];
	f1 = heapFloat[(r9+8)];
	if(f0 >f1) //_LBB56_8
{
__label__ = 8;
}
else{
	r10 = r4 >> 2;
	f0 = heapFloat[(r10)];
	f1 = heapFloat[(r9+4)];
	if(f0 <f1) //_LBB56_8
{
__label__ = 8;
}
else{
	r10 = 1;
__label__ = 9;
}
}
if (__label__ == 8){
	r10 = 0;
}
	f0 = heapFloat[(r8+2)];
	f1 = heapFloat[(r9+10)];
	if(f0 >f1) //_LBB56_12
{
__label__ = 11;
}
else{
	r11 = r4 >> 2;
	f0 = heapFloat[(r11+2)];
	f1 = heapFloat[(r9+6)];
	if(f0 <f1) //_LBB56_12
{
__label__ = 11;
}
else{
__label__ = 12;
}
}
if (__label__ == 11){
	r10 = 0;
}
	f0 = heapFloat[(r8+1)];
	f1 = heapFloat[(r9+9)];
if(!(f0 >f1)) //_LBB56_17
{
	r8 = r4 >> 2;
	f0 = heapFloat[(r8+1)];
	f1 = heapFloat[(r9+5)];
if(!(f0 <f1)) //_LBB56_17
{
	r8 = r10 & 255;
if(!(r8 ==0)) //_LBB56_17
{
	r8 = r5 >> 2;
	r8 = heap32[(r8)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r6;
	__FUNCTION_TABLE__[(r8)>>2](i7);
}
}
}
}
	r8 = heapU16[(r0+56)>>1];
	r6 = (r7 + 1)|0;
	r2 = (r2 + 1)|0;
	r8 = r8 << 1;
	r7 = r7 & 65535;
	r8 = r8 | 1;
if(!(uint(r7) <uint(r8))) //_LBB56_4
{
break _6;
}
}
}
	return;
}
}