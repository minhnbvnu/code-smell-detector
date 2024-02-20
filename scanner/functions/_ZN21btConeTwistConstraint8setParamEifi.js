function _ZN21btConeTwistConstraint8setParamEifi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var f0;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	f0 = heapFloat[(fp+2)];
	r2 = heap32[(fp+3)];
	r3 = (r0 + -3)|0;
	if(uint(r3) <uint(2)) //_LBB583_5
{
	if(uint(r2) >uint(2)) //_LBB583_7
{
	r0 = r1 >> 2;
	heapFloat[(r0+148)] = f0;
	r1 = heap32[(r0+145)];
	r1 = r1 | 4;
	heap32[(r0+145)] = r1;
	return;
}
else{
	r1 = r1 >> 2;
	heapFloat[(r1+146)] = f0;
	r0 = heap32[(r1+145)];
	r0 = r0 | 1;
	heap32[(r1+145)] = r0;
	return;
}
}
else{
	r0 = (r0 + -1)|0;
	if(uint(r0) >uint(1)) //_LBB583_8
{
	r0 = _2E_str10;
	r1 = _2E_str24;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 1066;
	_assert(i7);
}
else{
	if(uint(r2) >uint(2)) //_LBB583_4
{
	r1 = r1 >> 2;
	heapFloat[(r1+105)] = f0;
	return;
}
else{
	r1 = r1 >> 2;
	heapFloat[(r1+147)] = f0;
	r2 = heap32[(r1+145)];
	r2 = r2 | 2;
	heap32[(r1+145)] = r2;
	return;
}
}
}
}