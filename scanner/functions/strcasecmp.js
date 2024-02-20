function strcasecmp(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r5 = 26;
_1: while(true){
	r2 = heap8[r1];
	r3 = heap8[r0];
	r4 = (r2 + -65)|0;
	r2 = (r2 + -33)|0;
	r6 = (r3 + -65)|0;
	r3 = (r3 + -33)|0;
	r2 = uint(r4) < uint(r5) ? r2 : r4;
	r3 = uint(r6) < uint(r5) ? r3 : r6;
	if(r2 !=r3) //_LBB731_3
{
break _1;
}
else{
	r1 = (r1 + 1)|0;
	r0 = (r0 + 1)|0;
	if(r3 !=-65) //_LBB731_1
{
continue _1;
}
else{
break _1;
}
}
}
	r0 = (r3 - r2)|0;
	r_g0 = r0;
	return;
}