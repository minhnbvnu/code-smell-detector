function memmove(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
_1: do {
if(!(r0 ==r1)) //_LBB734_8
{
	r2 = heap32[(fp+2)];
	if(uint(r0) <=uint(r1)) //_LBB734_5
{
if(!(r2 ==0)) //_LBB734_8
{
	r3 = 0;
	r2 = (r3 - r2)|0;
_6: while(true){
	r3 = (r0 - r2)|0;
	r4 = (r2 + 1)|0;
	r2 = (r1 - r2)|0;
	r3 = heapU8[r3+-1];
	heap8[r2+-1] = r3;
	r2 = r4;
	if(r4 !=0) //_LBB734_7
{
continue _6;
}
else{
break _1;
}
}
}
}
else{
if(!(r2 ==0)) //_LBB734_8
{
	r3 = r1;
_10: while(true){
	r4 = heapU8[r0];
	r2 = (r2 + -1)|0;
	r5 = (r3 + 1)|0;
	r0 = (r0 + 1)|0;
	heap8[r3] = r4;
	r3 = r5;
	if(r2 ==0) //_LBB734_8
{
break _1;
}
else{
continue _10;
}
}
}
}
}
} while(0);
	r_g0 = r1;
	return;
}