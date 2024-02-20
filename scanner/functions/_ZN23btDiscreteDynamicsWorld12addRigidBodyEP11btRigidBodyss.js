function _ZN23btDiscreteDynamicsWorld12addRigidBodyEP11btRigidBodyss(sp)
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
if(!(r4 !=0)) //_LBB659_5
{
	r4 = heapU8[r0+496];
	r4 = r4 & 1;
if(!(r4 != 0)) //_LBB659_5
{
	f0 = heapFloat[(r1+84)];
	f1 =                         0;
if(!(f0 ==f1)) //_LBB659_4
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
if(!(r4 ==0)) //_LBB659_31
{
	r4 = heap32[(fp+2)];
	r5 = heap32[(fp+3)];
	r2 = r2 & 1;
_10: do {
	if(r2 != 0) //_LBB659_28
{
	r2 = heap32[(r1+54)];
	r2 = (r2 + -4)|0;
	if(uint(r2) <uint(2)) //_LBB659_30
{
break _10;
}
else{
	heap32[(r1+54)] = 2;
}
}
else{
	r1 = r3 >> 2;
	r2 = heap32[(r1+53)];
	r6 = heap32[(r1+52)];
	if(r2 ==r6) //_LBB659_9
{
	r7 = 1;
	r8 = r6 << 1;
	r8 = r6 == 0 ? r7 : r8;
if(!(r2 >=r8)) //_LBB659_8
{
	if(r8 !=0) //_LBB659_12
{
	r2 = gNumAlignedAllocs;
	r2 = r2 >> 2;
	r9 = heap32[(r2)];
	r10 = r8 << 2;
	r9 = (r9 + 1)|0;
	r10 = r10 | 3;
	heap32[(r2)] = r9;
	r2 = (r10 + 16)|0;
	heap32[(g0)] = r2;
	malloc(i7);
	r2 = r_g0;
	if(r2 !=0) //_LBB659_14
{
	r9 = 0;
	r10 = (r2 + 4)|0;
	r9 = (r9 - r10)|0;
	r9 = r9 & 15;
	r9 = (r2 + r9)|0;
	r10 = (r9 + 4)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r2;
	r2 = r10;
}
}
else{
	r2 = 0;
}
	r9 = (r3 + 216)|0;
	if(r6 <1) //_LBB659_17
{
	r10 = r9 >> 2;
	r11 = heap32[(r10)];
}
else{
	r10 = 0;
_25: while(true){
	r11 = r9 >> 2;
	r11 = heap32[(r11)];
	r12 = r10 << 2;
	r13 = (r11 + r12)|0;
	r13 = r13 >> 2;
	r12 = (r2 + r12)|0;
	r13 = heap32[(r13)];
	r10 = (r10 + 1)|0;
	r12 = r12 >> 2;
	heap32[(r12)] = r13;
if(!(r6 !=r10)) //_LBB659_18
{
break _25;
}
}
	r9 = (r3 + 216)|0;
}
	if(r11 !=0) //_LBB659_22
{
	r10 = heapU8[r3+220];
	if(r10 !=0) //_LBB659_24
{
	r6 = gNumAlignedFree;
	r6 = r6 >> 2;
	r10 = heap32[(r6)];
	r10 = (r10 + 1)|0;
	r11 = r11 >> 2;
	heap32[(r6)] = r10;
	r6 = heap32[(r11+-1)];
	heap32[(g0)] = r6;
	free(i7);
	r6 = heap32[(r1+52)];
}
	r10 = r9 >> 2;
	heap32[(r10)] = 0;
}
	r9 = r9 >> 2;
	heap8[r3+220] = r7;
	heap32[(r9)] = r2;
	heap32[(r1+53)] = r8;
}
}
	r2 = r6 << 2;
	r6 = heap32[(r1+54)];
	r2 = (r6 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = r0;
	r2 = heap32[(r1+52)];
	r2 = (r2 + 1)|0;
	heap32[(r1+52)] = r2;
}
} while(0);
	r1 = r3 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+8)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r5;
	__FUNCTION_TABLE__[(r1)>>2](i7);
}
	return;
}