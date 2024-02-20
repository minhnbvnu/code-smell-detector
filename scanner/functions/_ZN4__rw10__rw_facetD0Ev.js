function _ZN4__rw10__rw_facetD0Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTVN4__rw10__rw_facetE;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	heap32[(r2+5)] = -1;
	r1 = heap32[(r2+1)];
	r3 = heap32[(r2+2)];
if(!(r1 ==r3)) //_LBB700_3
{
if(!(r1 ==0)) //_LBB700_3
{
	heap32[(g0)] = r1;
	_ZdaPv(i7);
}
}
	r1 = _ZZN4__rw10__rw_facetD4EvE9destroyed;
	heap32[(r2+1)] = r1;
	r1 = heap32[(r2+4)];
if(!(r1 !=-1)) //_LBB700_5
{
	r1 = heap32[(r2+3)];
	heap32[(g0)] = r1;
	_ZdlPv(i7);
}
	heap32[(g0)] = r0;
	_ZdlPv(i7);
	return;
}