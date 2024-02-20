function strcpy(sp)
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
	r1 = heap32[(fp+1)];
	r2 = r1 ^ r0;
	r2 = r2 & 3;
_1: do {
	if(r2 ==0) //_LBB732_2
{
	r2 = r0 & 3;
	if(r2 !=0) //_LBB732_4
{
	r2 = r0 | -4;
_5: while(true){
	if(r2 !=0) //_LBB732_7
{
	r3 = heapU8[r1];
	r4 = (r0 + 1)|0;
	r1 = (r1 + 1)|0;
	r2 = (r2 + 1)|0;
	heap8[r0] = r3;
	r0 = r4;
if(!(r3 !=0)) //_LBB732_5
{
break _1;
}
}
else{
break _5;
}
}
}
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
	r3 = r2 & -2139062144;
	r3 = r3 ^ -2139062144;
	r4 = (r2 + -16843009)|0;
	r3 = r3 & r4;
_9: do {
	if(r3 ==0) //_LBB732_11
{
	r1 = (r1 + 4)|0;
_11: while(true){
	r3 = r0 >> 2;
	r4 = r1 >> 2;
	heap32[(r3)] = r2;
	r2 = heap32[(r4)];
	r3 = r2 & -2139062144;
	r0 = (r0 + 4)|0;
	r1 = (r1 + 4)|0;
	r3 = r3 ^ -2139062144;
	r4 = (r2 + -16843009)|0;
	r3 = r3 & r4;
if(!(r3 ==0)) //_LBB732_15
{
break _9;
}
}
}
} while(0);
	r1 = r2 & 255;
	heap8[r0] = r2;
if(!(r1 ==0)) //_LBB732_8
{
	r0 = (r0 + 1)|0;
_15: while(true){
	r2 = r2 >>> 8;
	r1 = (r0 + 1)|0;
	heap8[r0] = r2;
	r3 = r2 & 255;
	r0 = r1;
	if(r3 ==0) //_LBB732_8
{
break _1;
}
else{
continue _15;
}
}
}
}
else{
_17: while(true){
	r2 = heapU8[r1];
	r3 = (r0 + 1)|0;
	r1 = (r1 + 1)|0;
	heap8[r0] = r2;
	r0 = r3;
	if(r2 ==0) //_LBB732_8
{
break _1;
}
else{
continue _17;
}
}
}
} while(0);
	return;
}