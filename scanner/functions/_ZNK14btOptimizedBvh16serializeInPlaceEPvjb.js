function _ZNK14btOptimizedBvh16serializeInPlaceEPvjb(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r3;
	_ZNK14btQuantizedBvh9serializeEPvjb(i7);
	r0 = 1;
	r_g0 = r0;
	return;
}