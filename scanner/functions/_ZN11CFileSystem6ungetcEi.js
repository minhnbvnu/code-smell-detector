function _ZN11CFileSystem6ungetcEi(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	r1 = heap32[(fp+1)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	mandreel_ungetc(i7);
	return;
}