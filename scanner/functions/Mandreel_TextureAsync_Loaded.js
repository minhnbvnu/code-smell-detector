function Mandreel_TextureAsync_Loaded(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = 5;
	r0 = heap32[(r0)];
	r1 = heap32[(fp)];
	heap32[(g0)] = 0;
	heap32[(g0+1)] = 3553;
	heap32[(g0+2)] = r1;
	r2 = 100;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	r0 = heap32[(r2)];
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	heap32[(g0)] = 0;
	heap32[(g0+1)] = 3553;
	heap32[(g0+2)] = 0;
	heap32[(g0+3)] = 6408;
	heap32[(g0+4)] = r2;
	heap32[(g0+5)] = r3;
	heap32[(g0+6)] = 0;
	heap32[(g0+7)] = 6408;
	heap32[(g0+8)] = 5121;
	heap32[(g0+9)] = 0;
	__FUNCTION_TABLE__[(r0)>>2](i7);
	heap32[(g0)] = r1;
	Mandreel_TextureAsync_SetData(i7);
	return;
}