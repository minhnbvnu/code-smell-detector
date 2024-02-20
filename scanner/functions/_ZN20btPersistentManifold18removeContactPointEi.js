function _ZN20btPersistentManifold18removeContactPointEi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+279)];
	r3 = (r2 + -1)|0;
	r4 = heap32[(fp+1)];
	if(r3 ==r4) //_LBB557_2
{
	r3 = (r2 * 276)|0;
	r0 = (r0 + r3)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0+-41)];
	if(r0 !=0) //_LBB557_4
{
	r1 = _2E_str434;
	r2 = _2E_str483;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 160;
	_assert(i7);
}
}
else{
	r4 = (r4 * 276)|0;
	r5 = (r0 + 4)|0;
	r3 = (r3 * 276)|0;
	r4 = (r5 + r4)|0;
	r3 = (r5 + r3)|0;
	r2 = (r2 * 276)|0;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 276;
	r0 = (r0 + r2)|0;
	memcpy(i7);
	r2 = r0 >> 2;
	heap32[(r2+-41)] = 0;
	heap32[(r2+-16)] = 0;
	heap32[(r2+-8)] = 0;
	heap32[(r2)] = 0;
	r3 = 0;
	heap32[(r2+-40)] = 0;
	heap8[r0+-156] = r3;
	heap32[(r2+-38)] = 0;
	heap32[(r2+-37)] = 0;
	heap32[(r2+-32)] = 0;
	r2 = heap32[(r1+279)];
}
	r0 = (r2 + -1)|0;
	heap32[(r1+279)] = r0;
	return;
}