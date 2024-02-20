function __fwrite(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
if(!(uint(r0) >uint(9))) //_LBB782_2
{
	r0 = _ZL13s_file_stdout;
}
	r3 = r0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+2)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 1;
	heap32[(g0+3)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	return;
}