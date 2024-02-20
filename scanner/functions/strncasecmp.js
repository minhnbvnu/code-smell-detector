function strncasecmp(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = 0;
	r7 = 26;
_1: while(true){
	if(r3 >=r2) //_LBB735_5
{
__label__ = 5;
break _1;
}
else{
	r4 = heap8[r1+r3];
	r5 = heap8[r0+r3];
	r6 = (r4 + -65)|0;
	r4 = (r4 + -33)|0;
	r8 = (r5 + -65)|0;
	r5 = (r5 + -33)|0;
	r4 = uint(r6) < uint(r7) ? r4 : r6;
	r5 = uint(r8) < uint(r7) ? r5 : r8;
	if(r4 !=r5) //_LBB735_4
{
__label__ = 4;
break _1;
}
else{
	r3 = (r3 + 1)|0;
	if(r5 !=-65) //_LBB735_1
{
continue _1;
}
else{
__label__ = 4;
break _1;
}
}
}
}
switch(__label__ ){//multiple entries
case 5:
	r0 = 0;
	r_g0 = r0;
	return;
break;
case 4:
	r0 = (r5 - r4)|0;
	r_g0 = r0;
	return;
break;
}
}