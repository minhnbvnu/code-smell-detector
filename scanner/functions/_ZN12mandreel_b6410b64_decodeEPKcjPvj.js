function _ZN12mandreel_b6410b64_decodeEPKcjPvj(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = r0 & 3;
	r2 = 0;
	r1 = r1 != r2;
	r1 = r1 & 1;
	r3 = r0 >>> 2;
	r1 = (r1 + r3)|0;
	r3 = heap32[(fp+2)];
	r1 = (r1 * 3)|0;
	if(r3 !=0) //_LBB806_2
{
	r4 = heap32[(fp+3)];
	if(uint(r1) <=uint(r4)) //_LBB806_4
{
	r1 = heap32[(fp)];
	r4 = r3;
	r5 = r2;
_5: while(true){
	if(r0 !=0) //_LBB806_5
{
	r6 = heapU8[r1];
	if(r6 !=61) //_LBB806_7
{
	r7 = _ZN12mandreel_b64L11b64_indexesE;
	r6 = heapU8[r7+r6];
	if(r6 !=255) //_LBB806_9
{
	r5 = 0;
	r7 = sp + -4;
	heap8[r7+r2] = r6;
__label__ = 8;
}
else{
__label__ = 15;
}
}
else{
	r5 = (r5 + 1)|0;
	r6 = sp + -4;
	r7 = 0;
	heap8[r6+r2] = r7;
__label__ = 8;
}
if (__label__ == 8){
	r2 = (r2 + 1)|0;
	if(r2 ==4) //_LBB806_12
{
	r2 = heapU8[sp+-3];
	r6 = heapU8[sp+-4];
	r2 = r2 >>> 4;
	r2 = r2 & 3;
	r6 = r6 << 2;
	r2 = r2 | r6;
	heap8[r4] = r2;
	if(r5 !=2) //_LBB806_14
{
	r2 = heapU8[sp+-2];
	r6 = heapU8[sp+-3];
	r2 = r2 >>> 2;
	r2 = r2 & 15;
	r6 = r6 << 4;
	r2 = r2 | r6;
	heap8[r4+1] = r2;
	if(r5 !=1) //_LBB806_16
{
	r2 = heapU8[sp+-2];
	r7 = heapU8[sp+-1];
	r2 = r2 << 6;
	r6 = (r4 + 3)|0;
	r2 = (r2 + r7)|0;
	heap8[r4+2] = r2;
	if(r5 ==0) //_LBB806_18
{
	r2 = 0;
	r4 = r6;
	r5 = r2;
}
else{
__label__ = 18;
break _5;
}
}
else{
__label__ = 12;
break _5;
}
}
else{
__label__ = 10;
break _5;
}
}
}
	r0 = (r0 + -1)|0;
	r1 = (r1 + 1)|0;
}
else{
__label__ = 17;
break _5;
}
}
switch(__label__ ){//multiple entries
case 17:
	r6 = r4;
break;
case 12:
	r6 = (r4 + 2)|0;
break;
case 10:
	r6 = (r4 + 1)|0;
break;
}
	r1 = (r6 - r3)|0;
}
else{
	r1 = 0;
}
}
	r_g0 = r1;
	return;
}