function _ZN21btConeTwistConstraint8getInfo1EPN17btTypedConstraint17btConstraintInfo1E(sp)
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
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heapU8[r0+515];
	if(r2 ==0) //_LBB580_2
{
	r1 = r1 >> 2;
	heap32[(r1)] = 3;
	r2 = r0 >> 2;
	heap32[(r1+1)] = 3;
	r3 = heap32[(r2+6)];
	r4 = heap32[(r2+5)];
	r5 = (r4 + 4)|0;
	r6 = (r3 + 4)|0;
	r4 = (r4 + 256)|0;
	r3 = (r3 + 256)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r3;
	_ZN21btConeTwistConstraint14calcAngleInfo2ERK11btTransformS2_RK11btMatrix3x3S5_(i7);
	r3 = heapU8[r0+514];
if(!(r3 ==0)) //_LBB580_6
{
	r3 = heap32[(r1)];
	r4 = (r3 + 1)|0;
	heap32[(r1)] = r4;
	r4 = heap32[(r1+1)];
	r5 = (r4 + -1)|0;
	heap32[(r1+1)] = r5;
	f0 = heapFloat[(r2+111)];
	f1 = heapFloat[(r2+108)];
if(!(f1 >=f0)) //_LBB580_6
{
	f1 = heapFloat[(r2+109)];
if(!(f1 >=f0)) //_LBB580_6
{
	r2 = (r3 + 2)|0;
	r3 = (r4 + -2)|0;
	heap32[(r1)] = r2;
	heap32[(r1+1)] = r3;
}
}
}
	r0 = heapU8[r0+513];
if(!(r0 ==0)) //_LBB580_8
{
	r0 = heap32[(r1)];
	r0 = (r0 + 1)|0;
	heap32[(r1)] = r0;
	r0 = heap32[(r1+1)];
	r0 = (r0 + -1)|0;
	heap32[(r1+1)] = r0;
}
	return;
}
else{
	r0 = r1 >> 2;
	heap32[(r0)] = 0;
	heap32[(r0+1)] = 0;
	return;
}
}