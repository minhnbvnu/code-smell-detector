function _ZN23btDiscreteDynamicsWorld12addRigidBodyEP11btRigidBody(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+51)];
	r3 = heap32[(fp)];
	r4 = r2 & 3;
if(!(r4 !=0)) //_LBB660_5
{
	r4 = heapU8[r0+496];
	r4 = r4 & 1;
if(!(r4 != 0)) //_LBB660_5
{
	f0 = heapFloat[(r1+84)];
	f1 =                         0;
if(!(f0 ==f1)) //_LBB660_4
{
	r4 = r3 >> 2;
	f1 =                         1;
	f0 = f1/f0;
	f1 = heapFloat[(r4+58)];
	f2 = heapFloat[(r4+57)];
	f3 = heapFloat[(r4+56)];
	f3 = f3*f0;
	f2 = f2*f0;
	heapFloat[(r1+89)] = f3;
	f0 = f1*f0;
	heapFloat[(r1+90)] = f2;
	heapFloat[(r1+91)] = f0;
	heap32[(r1+92)] = 0;
}
	r4 = r3 >> 2;
	heap32[(r1+93)] = heap32[(r4+56)];
	heap32[(r1+94)] = heap32[(r4+57)];
	heap32[(r1+95)] = heap32[(r4+58)];
	heap32[(r1+96)] = heap32[(r4+59)];
}
}
	r4 = heap32[(r1+48)];
if(!(r4 ==0)) //_LBB660_32
{
	r4 = r2 & 1;
_10: do {
	if(r4 != 0) //_LBB660_28
{
	r4 = heap32[(r1+54)];
	r4 = (r4 + -4)|0;
	if(uint(r4) >uint(1)) //_LBB660_30
{
	heap32[(r1+54)] = 2;
}
else{
break _10;
}
}
else{
	r2 = r3 >> 2;
	r4 = heap32[(r2+53)];
	r5 = heap32[(r2+52)];
	if(r4 ==r5) //_LBB660_9
{
	r6 = 1;
	r7 = r5 << 1;
	r7 = r5 == 0 ? r6 : r7;
if(!(r4 >=r7)) //_LBB660_8
{
	if(r7 !=0) //_LBB660_12
{
	r4 = gNumAlignedAllocs;
	r4 = r4 >> 2;
	r8 = heap32[(r4)];
	r9 = r7 << 2;
	r8 = (r8 + 1)|0;
	r9 = r9 | 3;
	heap32[(r4)] = r8;
	r4 = (r9 + 16)|0;
	heap32[(g0)] = r4;
	malloc(i7);
	r4 = r_g0;
	if(r4 !=0) //_LBB660_14
{
	r8 = 0;
	r9 = (r4 + 4)|0;
	r8 = (r8 - r9)|0;
	r8 = r8 & 15;
	r8 = (r4 + r8)|0;
	r9 = (r8 + 4)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = r4;
	r4 = r9;
}
}
else{
	r4 = 0;
}
	r8 = (r3 + 216)|0;
	if(r5 <1) //_LBB660_17
{
	r9 = r8 >> 2;
	r10 = heap32[(r9)];
}
else{
	r9 = 0;
_25: while(true){
	r10 = r8 >> 2;
	r10 = heap32[(r10)];
	r11 = r9 << 2;
	r12 = (r10 + r11)|0;
	r12 = r12 >> 2;
	r11 = (r4 + r11)|0;
	r12 = heap32[(r12)];
	r9 = (r9 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r11)] = r12;
if(!(r5 !=r9)) //_LBB660_18
{
break _25;
}
}
	r8 = (r3 + 216)|0;
}
	if(r10 !=0) //_LBB660_22
{
	r9 = heapU8[r3+220];
	if(r9 !=0) //_LBB660_24
{
	r5 = gNumAlignedFree;
	r5 = r5 >> 2;
	r9 = heap32[(r5)];
	r9 = (r9 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r5)] = r9;
	r5 = heap32[(r10+-1)];
	heap32[(g0)] = r5;
	free(i7);
	r5 = heap32[(r2+52)];
}
	r9 = r8 >> 2;
	heap32[(r9)] = 0;
}
	r8 = r8 >> 2;
	heap8[r3+220] = r6;
	heap32[(r8)] = r4;
	heap32[(r2+53)] = r7;
}
}
	r4 = r5 << 2;
	r5 = heap32[(r2+54)];
	r4 = (r5 + r4)|0;
	r4 = r4 >> 2;
	heap32[(r4)] = r0;
	r4 = heap32[(r2+52)];
	r4 = (r4 + 1)|0;
	heap32[(r2+52)] = r4;
	r2 = heap32[(r1+51)];
}
} while(0);
	r1 = r3 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+8)];
	r4 = 2;
	r5 = 1;
	r2 = r2 & 3;
	r6 = -3;
	r7 = -1;
	r4 = r2 != 0 ? r4 : r5;
	r2 = r2 != 0 ? r6 : r7;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r2;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
	return;
}