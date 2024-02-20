function _ZN17btHingeConstraint8setParamEifi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var f0;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+3)];
if(!(r0 ==-1)) //_LBB597_2
{
	if(r0 !=5) //_LBB597_9
{
	r0 = _2E_str10;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 969;
	_assert(i7);
}
}
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	f0 = heapFloat[(fp+2)];
	if(r1 ==4) //_LBB597_6
{
	r0 = r0 >> 2;
	heapFloat[(r0+185)] = f0;
	r1 = heap32[(r0+183)];
	r1 = r1 | 1;
	heap32[(r0+183)] = r1;
	return;
}
else{
	if(r1 ==3) //_LBB597_7
{
	r0 = r0 >> 2;
	heapFloat[(r0+184)] = f0;
	r1 = heap32[(r0+183)];
	r1 = r1 | 4;
	heap32[(r0+183)] = r1;
	return;
}
else{
	if(r1 !=2) //_LBB597_8
{
	r0 = _2E_str10;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 964;
	_assert(i7);
}
else{
	r0 = r0 >> 2;
	heapFloat[(r0+186)] = f0;
	r1 = heap32[(r0+183)];
	r1 = r1 | 2;
	heap32[(r0+183)] = r1;
	return;
}
}
}
}