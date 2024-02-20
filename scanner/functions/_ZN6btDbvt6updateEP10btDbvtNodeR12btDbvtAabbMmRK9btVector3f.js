function _ZN6btDbvt6updateEP10btDbvtNodeR12btDbvtAabbMmRK9btVector3f(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r0 = r0 >> 2;
	r1 = heap32[(fp+1)];
	f0 = heapFloat[(r0)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+3)];
	f1 = heapFloat[(fp+4)];
	r4 = r1 >> 2;
	f2 = heapFloat[(r4)];
	if(f2 <=f0) //_LBB82_2
{
	f2 = heapFloat[(r0+1)];
	f3 = heapFloat[(r4+1)];
	if(f3 <=f2) //_LBB82_4
{
	f3 = heapFloat[(r4+2)];
	f4 = heapFloat[(r0+2)];
if(!(f3 >f4)) //_LBB82_3
{
	f3 = heapFloat[(r4+4)];
	f4 = heapFloat[(r0+4)];
if(!(f3 <f4)) //_LBB82_3
{
	f3 = heapFloat[(r4+5)];
	f4 = heapFloat[(r0+5)];
if(!(f3 <f4)) //_LBB82_3
{
	f3 = heapFloat[(r4+6)];
	f4 = heapFloat[(r0+6)];
if(!(f3 <f4)) //_LBB82_3
{
	r0 = 0;
	r_g0 = r0;
	return;
}
}
}
}
}
}
else{
	f2 = heapFloat[(r0+1)];
}
	f0 = f0-f1;
	f2 = f2-f1;
	heapFloat[(r0)] = f0;
	heapFloat[(r0+1)] = f2;
	f3 = heapFloat[(r0+2)];
	f3 = f3-f1;
	heapFloat[(r0+2)] = f3;
	f4 = heapFloat[(r0+4)];
	f4 = f4+f1;
	heapFloat[(r0+4)] = f4;
	f5 = heapFloat[(r0+5)];
	f5 = f5+f1;
	heapFloat[(r0+5)] = f5;
	f6 = heapFloat[(r0+6)];
	f1 = f6+f1;
	r3 = r3 >> 2;
	heapFloat[(r0+6)] = f1;
	f6 = heapFloat[(r3)];
	f7 =                         0;
	if(f6 <=f7) //_LBB82_10
{
	f0 = f0+f6;
	heapFloat[(r0)] = f0;
}
else{
	f0 = f4+f6;
	heapFloat[(r0+4)] = f0;
}
	f0 = heapFloat[(r3+1)];
	if(f0 <=f7) //_LBB82_13
{
	f0 = f2+f0;
	heapFloat[(r0+1)] = f0;
}
else{
	f0 = f5+f0;
	heapFloat[(r0+5)] = f0;
}
	f0 = heapFloat[(r3+2)];
	if(f0 <=f7) //_LBB82_16
{
	f0 = f3+f0;
	heapFloat[(r0+2)] = f0;
}
else{
	f0 = f1+f0;
	heapFloat[(r0+6)] = f0;
}
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	_ZL10removeleafP6btDbvtP10btDbvtNode(i7);
	r3 = r_g0;
_22: do {
	if(r3 !=0) //_LBB82_19
{
	r5 = r2 >> 2;
	r6 = heap32[(r5+2)];
	if(r6 <0) //_LBB82_24
{
	r5 = heap32[(r5)];
}
else{
	r7 = -1;
_27: while(true){
	r5 = r3;
	r7 = (r7 + 1)|0;
	if(r6 >r7) //_LBB82_23
{
	r3 = r5 >> 2;
	r3 = heap32[(r3+8)];
	if(r3 ==0) //_LBB82_22
{
break _22;
}
else{
continue _27;
}
}
else{
break _22;
}
}
}
}
else{
	r5 = 0;
}
} while(0);
	heap32[(r4)] = heap32[(r0)];
	heap32[(r4+1)] = heap32[(r0+1)];
	heap32[(r4+2)] = heap32[(r0+2)];
	heap32[(r4+3)] = heap32[(r0+3)];
	heap32[(r4+4)] = heap32[(r0+4)];
	heap32[(r4+5)] = heap32[(r0+5)];
	heap32[(r4+6)] = heap32[(r0+6)];
	heap32[(r4+7)] = heap32[(r0+7)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r1;
	_ZL10insertleafP6btDbvtP10btDbvtNodeS2_(i7);
	r0 = 1;
	r_g0 = r0;
	return;
}