function _printf_error(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + -16408;var g0 = i7>>2; // save stack
	r0 = (sp + 4)|0;
	heap32[(fp+-4097)] = r0;
	r1 = sp + -16384;
	r2 = heap32[(fp)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 16384;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r0;
	r0 = g_msgcallback;
	r0 = r0 >> 2;
	vsnprintf(i7);
	r0 = heap32[(r0)];
if(!(r0 ==0)) //_LBB818_2
{
	heap32[(g0)] = r1;
	__sandbox_OutputDebugString(i7);
}
	return;
}