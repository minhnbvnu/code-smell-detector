function _ZNK14btQuantizedBvh8quantizeEPtRK9btVector3i(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU8[r0+60];
	if(r1 !=0) //_LBB114_2
{
	r1 = heap32[(fp+2)];
	r1 = r1 >> 2;
	f0 = heapFloat[(r1)];
	r0 = r0 >> 2;
	f1 = heapFloat[(r0+5)];
	if(f0 <=f1) //_LBB114_4
{
	f1 = heapFloat[(r1+1)];
	f2 = heapFloat[(r0+6)];
	if(f1 <=f2) //_LBB114_6
{
	f2 = heapFloat[(r1+2)];
	f3 = heapFloat[(r0+7)];
	if(f2 <=f3) //_LBB114_8
{
	f3 = heapFloat[(r0+1)];
	if(f0 >=f3) //_LBB114_10
{
	f4 = heapFloat[(r0+2)];
	if(f1 >=f4) //_LBB114_12
{
	f5 = heapFloat[(r0+3)];
	if(f2 >=f5) //_LBB114_14
{
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+3)];
	f2 = f2-f5;
	f5 = heapFloat[(r0+11)];
	f1 = f1-f4;
	f4 = heapFloat[(r0+10)];
	f0 = f0-f3;
	f3 = heapFloat[(r0+9)];
	f2 = f2*f5;
	f1 = f1*f4;
	f0 = f0*f3;
	if(r2 ==0) //_LBB114_16
{
	r0 = Math.floor(f0);
	r2 = Math.floor(f1);
	r0 = r0 & 65534;
	r3 = Math.floor(f2);
	r2 = r2 & 65534;
	heap16[(r1)>>1] = r0;
	r0 = r3 & 65534;
}
else{
	f3 =                         1;
	f0 = f0+f3;
	f1 = f1+f3;
	r0 = Math.floor(f0);
	f0 = f2+f3;
	r2 = Math.floor(f1);
	r0 = r0 | 1;
	r3 = Math.floor(f0);
	r2 = r2 | 1;
	heap16[(r1)>>1] = r0;
	r0 = r3 | 1;
}
	heap16[(r1+2)>>1] = r2;
	heap16[(r1+4)>>1] = r0;
	return;
}
else{
	r0 = _2E_str9;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 361;
	_assert(i7);
}
}
else{
	r0 = _2E_str820;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 360;
	_assert(i7);
}
}
else{
	r0 = _2E_str717;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 359;
	_assert(i7);
}
}
else{
	r0 = _2E_str616;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 357;
	_assert(i7);
}
}
else{
	r0 = _2E_str515;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 356;
	_assert(i7);
}
}
else{
	r0 = _2E_str414;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 355;
	_assert(i7);
}
}
else{
	r0 = _2E_str212;
	r1 = _2E_str313;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 353;
	_assert(i7);
}
}