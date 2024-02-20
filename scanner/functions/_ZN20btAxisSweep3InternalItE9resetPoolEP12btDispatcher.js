function _ZN20btAxisSweep3InternalItE9resetPoolEP12btDispatcher(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heapU16[(r0+56)>>1];
if(!(r1 !=0)) //_LBB54_6
{
	r1 = 1;
	heap16[(r0+64)>>1] = r1;
	r2 = heapU16[(r0+58)>>1];
	if(uint(r2) >uint(1)) //_LBB54_3
{
	r3 = 2;
_5: while(true){
	r2 = r1 & 65535;
	r4 = r0 >> 2;
	r2 = r2 << 6;
	r4 = heap32[(r4+15)];
	r2 = (r4 + r2)|0;
	heap16[(r2+48)>>1] = r3;
	r1 = (r1 + 1)|0;
	r2 = heapU16[(r0+58)>>1];
	r3 = (r3 + 1)|0;
	r4 = r1 & 65535;
if(!(uint(r2) >uint(r4))) //_LBB54_4
{
break _5;
}
}
}
	r1 = r2 & 65535;
	r0 = r0 >> 2;
	r1 = r1 << 6;
	r0 = heap32[(r0+15)];
	r0 = (r1 + r0)|0;
	r1 = 0;
	heap16[(r0+-16)>>1] = r1;
}
	return;
}