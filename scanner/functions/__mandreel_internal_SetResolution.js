function __mandreel_internal_SetResolution(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = _ZL25s_mandreel_internal_width;
	r1 = _ZL26s_mandreel_internal_height;
	r0 = r0 >> 2;
	r2 = heap32[(fp)];
	r1 = r1 >> 2;
	r3 = heap32[(fp+1)];
	heap32[(r0)] = r2;
	heap32[(r1)] = r3;
	return;
}