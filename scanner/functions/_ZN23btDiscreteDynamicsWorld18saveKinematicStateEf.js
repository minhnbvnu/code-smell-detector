function _ZN23btDiscreteDynamicsWorld18saveKinematicStateEf(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+2)];
if(!(r1 <1)) //_LBB670_11
{
	f0 = heapFloat[(fp+1)];
	f1 =                         1;
	f1 = f1/f0;
	r1 = 0;
_3: while(true){
	r2 = heap32[(r0+4)];
	r3 = r1 << 2;
	r2 = (r2 + r3)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r3 = heapU8[r2+232];
	r3 = r3 & 2;
if(!(r3 ==0)) //_LBB670_10
{
if(!(r2 ==0)) //_LBB670_10
{
	r3 = r2 >> 2;
	r4 = heap32[(r3+54)];
if(!(r4 ==2)) //_LBB670_10
{
	r4 = heapU8[r2+204];
	r4 = r4 & 2;
if(!(r4 ==0)) //_LBB670_10
{
	f2 =                         0;
if(!(f0 ==f2)) //_LBB670_10
{
	r4 = heap32[(r3+118)];
if(!(r4 ==0)) //_LBB670_9
{
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+2)];
	r6 = (r2 + 4)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r6;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
	f2 = heapFloat[(r3+13)];
	f3 = heapFloat[(r3+29)];
	f2 = f2-f3;
	f3 = heapFloat[(r3+15)];
	f4 = heapFloat[(r3+31)];
	f5 = heapFloat[(r3+14)];
	f6 = heapFloat[(r3+30)];
	f5 = f5-f6;
	f2 = f2*f1;
	f3 = f3-f4;
	f4 = f5*f1;
	heapFloat[(r3+76)] = f2;
	f2 = f3*f1;
	heapFloat[(r3+77)] = f4;
	heapFloat[(r3+78)] = f2;
	heap32[(r3+79)] = 0;
	r4 = sp + -16;
	r5 = (r2 + 68)|0;
	r2 = (r2 + 4)|0;
	r6 = sp + -20;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r6;
	_ZN15btTransformUtil22calculateDiffAxisAngleERK11btTransformS2_R9btVector3Rf(i7);
	r2 = r4 >> 2;
	f2 = heapFloat[(fp+-5)];
	f3 = heapFloat[(fp+-4)];
	f3 = f3*f2;
	f4 = heapFloat[(r2+2)];
	f5 = heapFloat[(r2+1)];
	f5 = f5*f2;
	f3 = f3*f1;
	f2 = f4*f2;
	f4 = f5*f1;
	heapFloat[(r3+80)] = f3;
	f2 = f2*f1;
	heapFloat[(r3+81)] = f4;
	heapFloat[(r3+82)] = f2;
	heap32[(r3+83)] = 0;
	heap32[(r3+33)] = heap32[(r3+76)];
	heap32[(r3+34)] = heap32[(r3+77)];
	heap32[(r3+35)] = heap32[(r3+78)];
	heap32[(r3+36)] = heap32[(r3+79)];
	heapFloat[(r3+37)] = f3;
	heapFloat[(r3+38)] = f4;
	heapFloat[(r3+39)] = f2;
	heap32[(r3+40)] = 0;
	heap32[(r3+17)] = heap32[(r3+1)];
	heap32[(r3+18)] = heap32[(r3+2)];
	heap32[(r3+19)] = heap32[(r3+3)];
	heap32[(r3+20)] = heap32[(r3+4)];
	heap32[(r3+21)] = heap32[(r3+5)];
	heap32[(r3+22)] = heap32[(r3+6)];
	heap32[(r3+23)] = heap32[(r3+7)];
	heap32[(r3+24)] = heap32[(r3+8)];
	heap32[(r3+25)] = heap32[(r3+9)];
	heap32[(r3+26)] = heap32[(r3+10)];
	heap32[(r3+27)] = heap32[(r3+11)];
	heap32[(r3+28)] = heap32[(r3+12)];
	heap32[(r3+29)] = heap32[(r3+13)];
	heap32[(r3+30)] = heap32[(r3+14)];
	heap32[(r3+31)] = heap32[(r3+15)];
	heap32[(r3+32)] = heap32[(r3+16)];
}
}
}
}
}
	r1 = (r1 + 1)|0;
	r2 = heap32[(r0+2)];
	if(r2 >r1) //_LBB670_2
{
continue _3;
}
else{
break _3;
}
}
}
	return;
}