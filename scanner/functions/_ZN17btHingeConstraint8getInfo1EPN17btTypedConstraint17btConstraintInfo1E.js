function _ZN17btHingeConstraint8getInfo1EPN17btTypedConstraint17btConstraintInfo1E(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heapU8[r0+723];
	if(r2 ==0) //_LBB595_2
{
	r1 = r1 >> 2;
	heap32[(r1)] = 5;
	heap32[(r1+1)] = 1;
	r2 = r0 >> 2;
	r3 = heap32[(r2+6)];
	r4 = heap32[(r2+5)];
	r4 = (r4 + 4)|0;
	r3 = (r3 + 4)|0;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r3;
	_ZN17btHingeConstraint13getHingeAngleERK11btTransformS2_(i7);
	f0 = f_g0;
	heapFloat[(r2+178)] = f0;
	heap32[(r2+176)] = 0;
	r3 = 0;
	heap32[(r2+175)] = 0;
	heap8[r0+722] = r3;
	f1 = heapFloat[(r2+172)];
	f2 = heapFloat[(r2+173)];
	if(f1 >f2) //_LBB595_8
{
__label__ = 8;
}
else{
	heapFloat[(g0)] = f0;
	heapFloat[(g0+1)] = f1;
	heapFloat[(g0+2)] = f2;
	_Z21btAdjustAngleToLimitsfff(i7);
	f0 = f_g0;
	heapFloat[(r2+178)] = f0;
	f1 = heapFloat[(r2+172)];
	if(f0 >f1) //_LBB595_5
{
	f1 = heapFloat[(r2+173)];
	if(f0 <f1) //_LBB595_7
{
	r2 = heapU8[r0+722];
	if(r2 !=0) //_LBB595_10
{
__label__ = 10;
}
else{
__label__ = 8;
}
}
else{
	f0 = f1-f0;
	heapFloat[(r2+176)] = f0;
	r3 = 1;
	heap32[(r2+175)] = -1082130432;
	heap8[r0+722] = r3;
__label__ = 10;
}
}
else{
	f0 = f1-f0;
	heapFloat[(r2+176)] = f0;
	r3 = 1;
	heap32[(r2+175)] = 1065353216;
	heap8[r0+722] = r3;
__label__ = 10;
}
}
if (__label__ == 8){
	r0 = heapU8[r0+721];
if(!(r0 !=0)) //_LBB595_10
{
	return;
}
}
	r0 = heap32[(r1)];
	r0 = (r0 + 1)|0;
	heap32[(r1)] = r0;
	r0 = heap32[(r1+1)];
	r0 = (r0 + -1)|0;
	heap32[(r1+1)] = r0;
	return;
}
else{
	r0 = r1 >> 2;
	heap32[(r0)] = 0;
	heap32[(r0+1)] = 0;
	return;
}
}