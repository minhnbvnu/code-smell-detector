function _ZN28btHashedOverlappingPairCache8findPairEP17btBroadphaseProxyS1_(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = gFindPairs;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r1 = (r1 + 1)|0;
	r4 = r2 >> 2;
	heap32[(r0)] = r1;
	r0 = r3 >> 2;
	r1 = heap32[(r4+3)];
	r0 = heap32[(r0+3)];
	r4 = r1 > r0 ? r2 : r3;
	r0 = r1 > r0 ? r3 : r2;
	r1 = r4 >> 2;
	r1 = heap32[(r1+3)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+3)];
	r2 = r1 << 16;
	r2 = r2 | r0;
	r3 = r2 << 15;
	r3 = r3 ^ -1;
	r2 = (r2 + r3)|0;
	r3 = r2 >> 10;
	r2 = r3 ^ r2;
	r2 = (r2 * 9)|0;
	r3 = r2 >> 6;
	r2 = r3 ^ r2;
	r3 = r2 << 11;
	r4 = heap32[(fp)];
	r3 = r3 ^ -1;
	r4 = r4 >> 2;
	r2 = (r2 + r3)|0;
	r3 = r2 >> 16;
	r5 = heap32[(r4+3)];
	r2 = r3 ^ r2;
	r3 = (r5 + -1)|0;
	r2 = r2 & r3;
	r3 = heap32[(r4+9)];
_1: do {
if(!(r3 <=r2)) //_LBB137_9
{
	r3 = heap32[(r4+11)];
	r2 = r2 << 2;
	r2 = (r3 + r2)|0;
_3: while(true){
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	if(r2 ==-1) //_LBB137_9
{
break _1;
}
else{
	r3 = heap32[(r4+4)];
	r5 = r2 << 4;
	r3 = (r3 + r5)|0;
	r5 = r3 >> 2;
	r6 = heap32[(r5)];
	r6 = r6 >> 2;
	r6 = heap32[(r6+3)];
if(!(r6 !=r0)) //_LBB137_2
{
	r5 = heap32[(r5+1)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+3)];
if(!(r5 !=r1)) //_LBB137_2
{
break _3;
}
}
	r3 = heap32[(r4+16)];
	r2 = r2 << 2;
	r2 = (r3 + r2)|0;
}
}
	r0 = heap32[(r4+2)];
	if(r0 >r2) //_LBB137_8
{
	r_g0 = r3;
	return;
}
else{
	r3 = _2E_str222;
	r0 = _2E_str121;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 165;
	_assert(i7);
}
}
} while(0);
	r0 = 0;
	r_g0 = r0;
	return;
}