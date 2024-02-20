function memset(sp)
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
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp)];
if(!(r0 ==0)) //_LBB742_3
{
	r2 = heap32[(fp+1)];
	r3 = r1;
_3: while(true){
	r0 = (r0 + -1)|0;
	r4 = (r3 + 1)|0;
	heap8[r3] = r2;
	r3 = r4;
	if(r0 !=0) //_LBB742_2
{
continue _3;
}
else{
break _3;
}
}
}
	r_g0 = r1;
	return;
}