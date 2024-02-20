function _ZL10removeleafP6btDbvtP10btDbvtNode(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r2 = heap32[(r0)];
	if(r2 !=r1) //_LBB81_2
{
	r2 = r1 >> 2;
	r2 = heap32[(r2+8)];
	r3 = r2 >> 2;
	r4 = heap32[(r3+10)];
	r1 = r4 != r1;
	r1 = r1 & 1;
	r1 = r1 << 2;
	r1 = (r2 + r1)|0;
	r1 = r1 >> 2;
	r3 = heap32[(r3+8)];
	r1 = heap32[(r1+9)];
_3: do {
	if(r3 ==0) //_LBB81_11
{
	r3 = r1 >> 2;
	heap32[(r0)] = r1;
	heap32[(r3+8)] = 0;
	r3 = heap32[(r0+1)];
if(!(r3 ==0)) //_LBB81_13
{
	r1 = gNumAlignedFree;
	r1 = r1 >> 2;
	r4 = heap32[(r1)];
	r4 = (r4 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r1)] = r4;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r0+1)] = r2;
	r3 = heap32[(r0)];
}
else{
	r4 = r3 >> 2;
	r4 = heap32[(r4+10)];
	r4 = r4 == r2;
	r4 = r4 & 1;
	r4 = r4 << 2;
	r4 = (r3 + r4)|0;
	r4 = r4 >> 2;
	r5 = r1 >> 2;
	heap32[(r4+9)] = r1;
	heap32[(r5+8)] = r3;
	r1 = heap32[(r0+1)];
if(!(r1 ==0)) //_LBB81_5
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
	heap32[(r0+1)] = r2;
_12: while(true){
	if(r3 !=0) //_LBB81_6
{
	r1 = r3 >> 2;
	r2 = heap32[(r1+10)];
	r4 = heap32[(r1+9)];
	r2 = r2 >> 2;
	r4 = r4 >> 2;
	f0 = heapFloat[(r1+6)];
	f1 = heapFloat[(r1)];
	f2 = heapFloat[(r1+1)];
	f3 = heapFloat[(r1+2)];
	f4 = heapFloat[(r1+4)];
	f5 = heapFloat[(r1+5)];
	f6 = heapFloat[(r4)];
	f7 = heapFloat[(r2)];
	f6 = f6 < f7 ? f6 : f7;
	heapFloat[(r1)] = f6;
	f7 = heapFloat[(r4+4)];
	f8 = heapFloat[(r2+4)];
	f7 = f7 > f8 ? f7 : f8;
	heapFloat[(r1+4)] = f7;
	f8 = heapFloat[(r4+1)];
	f9 = heapFloat[(r2+1)];
	f8 = f8 < f9 ? f8 : f9;
	heapFloat[(r1+1)] = f8;
	f9 = heapFloat[(r4+5)];
	f10 = heapFloat[(r2+5)];
	f9 = f9 > f10 ? f9 : f10;
	heapFloat[(r1+5)] = f9;
	f10 = heapFloat[(r4+2)];
	f11 = heapFloat[(r2+2)];
	f10 = f10 < f11 ? f10 : f11;
	heapFloat[(r1+2)] = f10;
	f11 = heapFloat[(r4+6)];
	f12 = heapFloat[(r2+6)];
	f11 = f11 > f12 ? f11 : f12;
	heapFloat[(r1+6)] = f11;
if(!(f0 !=f11)) //_LBB81_8
{
	r2 = f1 == f6;
	r4 = f2 == f8;
	r2 = r2 & r4;
	r4 = f3 == f10;
	r2 = r2 & r4;
	r4 = f4 == f7;
	r2 = r2 & r4;
	r4 = f5 == f9;
	r2 = r2 & r4;
	if(r2 != 0) //_LBB81_14
{
break _3;
}
}
	r3 = heap32[(r1+8)];
}
else{
break _12;
}
}
	r0 = heap32[(r0)];
	r_g0 = r0;
	return;
}
} while(0);
	r_g0 = r3;
	return;
}
else{
	heap32[(r0)] = 0;
	r0 = 0;
	r_g0 = r0;
	return;
}
}