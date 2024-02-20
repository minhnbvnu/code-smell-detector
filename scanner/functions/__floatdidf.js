function __floatdidf(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	f0 = r0; //fitod r0, f0
	f1 =                4294967296;
	f2 = uint(r1); //fuitod r1, f2
	f0 = f0*f1;
	f0 = f2+f0;
	f_g0 = f0;
	return;
}