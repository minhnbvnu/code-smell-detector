function _ZN18btDbvtTreeCollider7ProcessEPK10btDbvtNodeS2_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+2)];
if(!(r0 ==r1)) //_LBB87_2
{
	r2 = heap32[(fp)];
	r2 = r2 >> 2;
	r3 = heap32[(r2+1)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+24)];
	r4 = r3 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	r4 = heap32[(r4+2)];
	r1 = heap32[(r1+9)];
	r0 = heap32[(r0+9)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r0 = heap32[(r2+1)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+30)];
	r1 = (r1 + 1)|0;
	heap32[(r0+30)] = r1;
}
	return;
}