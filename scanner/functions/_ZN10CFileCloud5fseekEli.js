function _ZN10CFileCloud5fseekEli(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
_1: do {
	if(r0 ==0) //_LBB780_4
{
	r1 = r1 >> 2;
}
else{
	if(r0 ==1) //_LBB780_6
{
	r0 = r1 >> 2;
	r1 = heap32[(r0+4)];
	r1 = (r1 + r2)|0;
	heap32[(r0+4)] = r1;
}
else{
if(!(r0 !=2)) //_LBB780_7
{
	r1 = r1 >> 2;
	r0 = heap32[(r1+2)];
	r2 = (r0 + r2)|0;
break _1;
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}
} while(0);
	heap32[(r1+4)] = r2;
	r1 = 0;
	r_g0 = r1;
	return;
}