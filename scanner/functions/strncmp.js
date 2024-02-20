function strncmp(sp)
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
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+1)];
	if(uint(r0) >uint(3)) //_LBB736_2
{
	r5 = r0 >>> 2;
	r1 = (r1 + 2)|0;
_3: while(true){
	r3 = heapU8[r1+-2];
	r4 = heapU8[r2];
	if(r3 ==0) //_LBB736_5
{
__label__ = 5;
break _3;
}
else{
	r6 = r4 & 255;
	if(r3 ==r6) //_LBB736_6
{
	r3 = heapU8[r1+-1];
	r4 = heapU8[r2+1];
	if(r3 ==0) //_LBB736_8
{
__label__ = 5;
break _3;
}
else{
	r6 = r4 & 255;
	if(r3 ==r6) //_LBB736_9
{
	r3 = heapU8[r1];
	r4 = heapU8[r2+2];
	if(r3 ==0) //_LBB736_11
{
__label__ = 5;
break _3;
}
else{
	r6 = r4 & 255;
	if(r3 ==r6) //_LBB736_12
{
	r3 = heapU8[r1+1];
	r4 = heapU8[r2+3];
	if(r3 ==0) //_LBB736_14
{
__label__ = 5;
break _3;
}
else{
	r6 = r4 & 255;
	if(r3 ==r6) //_LBB736_15
{
	r5 = (r5 + -1)|0;
	r1 = (r1 + 4)|0;
	r2 = (r2 + 4)|0;
	if(r5 !=0) //_LBB736_3
{
__label__ = 3;
}
else{
__label__ = 13;
break _3;
}
}
else{
__label__ = 5;
break _3;
}
}
}
else{
__label__ = 5;
break _3;
}
}
}
else{
__label__ = 5;
break _3;
}
}
}
else{
__label__ = 5;
break _3;
}
}
}
switch(__label__ ){//multiple entries
case 5:
	r1 = r4 & 255;
	r1 = (r3 - r1)|0;
	r_g0 = r1;
	return;
break;
case 13:
	r0 = r0 & 3;
	r1 = (r1 + -2)|0;
break;
}
}
else{
	r3 = 0;
	r4 = r3;
}
_17: while(true){
	if(r0 !=0) //_LBB736_17
{
	r3 = heapU8[r1];
	r4 = heapU8[r2];
	if(r3 ==0) //_LBB736_19
{
__label__ = 16;
break _17;
}
else{
	r5 = r4 & 255;
	if(r3 ==r5) //_LBB736_20
{
	r0 = (r0 + -1)|0;
	r1 = (r1 + 1)|0;
	r2 = (r2 + 1)|0;
continue _17;
}
else{
__label__ = 16;
break _17;
}
}
}
else{
__label__ = 19;
break _17;
}
}
switch(__label__ ){//multiple entries
case 16:
	r0 = r4 & 255;
	r0 = (r3 - r0)|0;
	r_g0 = r0;
	return;
break;
case 19:
	r0 = r3 & 255;
	r1 = r4 & 255;
	r0 = (r0 - r1)|0;
	r_g0 = r0;
	return;
break;
}
}