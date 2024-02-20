function _ZNK17btHingeConstraint8getParamEii(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var f0;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
if(!(r0 ==-1)) //_LBB598_2
{
	if(r0 !=5) //_LBB598_15
{
	r0 = _2E_str10;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 999;
	_assert(i7);
}
}
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	if(r1 ==4) //_LBB598_8
{
	r1 = heapU8[r0+732];
	r1 = r1 & 1;
	if(r1 != 0) //_LBB598_10
{
	r0 = (r0 + 740)|0;
}
else{
	r0 = _2E_str332;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 986;
	_assert(i7);
}
}
else{
	if(r1 ==3) //_LBB598_11
{
	r1 = heapU8[r0+732];
	r1 = r1 & 4;
	if(r1 !=0) //_LBB598_13
{
	r0 = (r0 + 736)|0;
}
else{
	r0 = _2E_str433;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 990;
	_assert(i7);
}
}
else{
	if(r1 !=2) //_LBB598_14
{
	r0 = _2E_str10;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 994;
	_assert(i7);
}
else{
	r1 = heapU8[r0+732];
	r1 = r1 & 2;
	if(r1 !=0) //_LBB598_7
{
	r0 = (r0 + 744)|0;
}
else{
	r0 = _2E_str130;
	r1 = _2E_str231;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 982;
	_assert(i7);
}
}
}
}
	r0 = r0 >> 2;
	f0 = heapFloat[(r0)];
	f_g0 = f0;
	return;
}