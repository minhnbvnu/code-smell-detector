function _ZNK21btConeTwistConstraint8getParamEii(sp)
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
	r2 = heap32[(fp+2)];
	r3 = (r0 + -3)|0;
	if(uint(r3) <uint(2)) //_LBB584_9
{
	if(uint(r2) >uint(2)) //_LBB584_13
{
	r0 = (r2 + -3)|0;
	if(uint(r0) >uint(2)) //_LBB584_17
{
	r1 = _2E_str10;
	r0 = _2E_str24;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 1107;
	_assert(i7);
}
else{
	r0 = heapU8[r1+580];
	r0 = r0 & 4;
	if(r0 !=0) //_LBB584_16
{
	r1 = (r1 + 592)|0;
}
else{
	r1 = _2E_str543;
	r0 = _2E_str24;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 1102;
	_assert(i7);
}
}
}
else{
	r2 = heapU8[r1+580];
	r2 = r2 & 1;
	if(r2 != 0) //_LBB584_12
{
	r1 = (r1 + 584)|0;
}
else{
	r1 = _2E_str442;
	r2 = _2E_str24;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 1097;
	_assert(i7);
}
}
}
else{
	r0 = (r0 + -1)|0;
	if(uint(r0) >uint(1)) //_LBB584_18
{
	r1 = _2E_str10;
	r0 = _2E_str24;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 1111;
	_assert(i7);
}
else{
	if(uint(r2) >uint(2)) //_LBB584_6
{
	r2 = (r2 + -3)|0;
	if(uint(r2) >uint(2)) //_LBB584_8
{
	r1 = _2E_str10;
	r2 = _2E_str24;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 1090;
	_assert(i7);
}
else{
	r1 = (r1 + 420)|0;
}
}
else{
	r2 = heapU8[r1+580];
	r2 = r2 & 2;
	if(r2 !=0) //_LBB584_5
{
	r1 = (r1 + 588)|0;
}
else{
	r1 = _2E_str1340;
	r2 = _2E_str24;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 1081;
	_assert(i7);
}
}
}
}
	r0 = r1 >> 2;
	f0 = heapFloat[(r0)];
	f_g0 = f0;
	return;
}