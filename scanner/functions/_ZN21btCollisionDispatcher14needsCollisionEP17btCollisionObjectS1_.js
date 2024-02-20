function _ZN21btCollisionDispatcher14needsCollisionEP17btCollisionObjectS1_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	if(r0 !=0) //_LBB182_2
{
	r1 = heap32[(fp+2)];
	if(r1 !=0) //_LBB182_4
{
	r2 = heap32[(fp)];
	r2 = r2 >> 2;
	r3 = heap32[(r2+1)];
	r4 = r3 & 1;
if(!(r4 != 0)) //_LBB182_8
{
	r4 = heapU8[r0+204];
	r4 = r4 & 3;
if(!(r4 ==0)) //_LBB182_8
{
	r4 = heapU8[r1+204];
	r4 = r4 & 3;
if(!(r4 ==0)) //_LBB182_8
{
	r3 = r3 | 1;
	heap32[(r2+1)] = r3;
	r2 = _2E_str977;
	heap32[(g0)] = r2;
	printf(i7);
}
}
}
	r2 = r0 >> 2;
	r3 = heap32[(r2+54)];
	if(r3 ==2) //_LBB182_10
{
__label__ = 10;
}
else{
	if(r3 !=5) //_LBB182_12
{
__label__ = 12;
}
else{
__label__ = 10;
}
}
_12: do {
if (__label__ == 10){
	r3 = r1 >> 2;
	r3 = heap32[(r3+54)];
if(!(r3 ==2)) //_LBB182_16
{
if(!(r3 ==5)) //_LBB182_16
{
break _12;
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}
} while(0);
	r3 = heap32[(r2+63)];
	if(r3 !=0) //_LBB182_14
{
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	r0 = 0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r0 = r_g0 == r0;
}
else{
	r0 = 0;
}
	r0 = r0 & 1;
	r0 = r0 ^ 1;
	r_g0 = r0;
	return;
}
else{
	r0 = _2E_str876;
	r1 = _2E_str573;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 167;
	_assert(i7);
}
}
else{
	r0 = _2E_str775;
	r1 = _2E_str573;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 166;
	_assert(i7);
}
}