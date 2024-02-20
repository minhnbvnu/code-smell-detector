function vsnprintf(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var r6;
	var r7;
	var r8;
	var r9;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = sp + -16;
	r1 = heap32[(fp+1)];
	r2 = r0 >> 2;
	r3 = heap32[(fp)];
	heap32[(r2+1)] = 0;
	r4 = (r1 + -1)|0;
	r5 = 0;
	r6 = sp + -24;
	r7 = r1 == 0 ? r5 : r4;
	heap32[(fp+-4)] = r3;
	r8 = r6 >> 2;
	r9 = swrite__index__;
	heap32[(r2+2)] = r7;
	heap32[(r8+1)] = r9;
	heap32[(fp+-6)] = r0;
	r0 = heap32[(fp+2)];
	r2 = heap32[(fp+3)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	__v_printf(i7);
	r0 = r_g0;
if(!(r3 ==0)) //_LBB803_7
{
if(!(r1 ==0)) //_LBB803_7
{
if(!(r0 <0)) //_LBB803_7
{
if(!(r1 ==-1)) //_LBB803_6
{
if(!(uint(r0) <uint(r1))) //_LBB803_6
{
	heap8[r3+r4] = r5;
	r_g0 = r0;
	return;
}
}
	heap8[r3+r0] = r5;
}
}
}
	r_g0 = r0;
	return;
}