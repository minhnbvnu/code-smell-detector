function iMandreel_TextureAsync_IsCompressed(sp)
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
	i7 = sp + -1032;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = sp + -1024;
	r4 = 0;
_1: while(true){
	r5 = heapU8[r0];
	if(r5 ==0) //_LBB814_5
{
break _1;
}
else{
	r6 = r5 << 24;
	r6 = r6 >> 24;
	r6 = (r6 + -65)|0;
	r7 = 26;
	r8 = (r5 + 32)|0;
	r5 = uint(r6) < uint(r7) ? r8 : r5;
	r6 = r5 & 255;
	r7 = 47;
	r5 = r6 == 92 ? r7 : r5;
	r0 = (r0 + 1)|0;
	r6 = r5 & 255;
if(!(r6 !=47)) //_LBB814_4
{
	r6 = r4 & 255;
	r4 = r5;
	if(r6 ==47) //_LBB814_1
{
continue _1;
}
}
	r4 = (r3 + 1)|0;
	heap8[r3] = r5;
	r3 = r4;
	r4 = r5;
continue _1;
}
}
	r0 = _ZL24g_pFirstTextureAsyncInfo;
	r4 = 0;
	heap8[r3] = r4;
_8: while(true){
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	if(r0 !=0) //_LBB814_6
{
	r3 = sp + -1024;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	strcmp(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB814_8
{
	r0 = (r0 + 280)|0;
continue _8;
}
else{
__label__ = 7;
break _8;
}
}
else{
__label__ = 10;
break _8;
}
}
switch(__label__ ){//multiple entries
case 10:
	r0 = -1;
	r_g0 = r0;
	return;
break;
case 7:
	r0 = r0 >> 2;
	r1 = r1 >> 2;
	r3 = heap32[(r0+65)];
	heap32[(r1)] = r3;
	r1 = r2 >> 2;
	r2 = heap32[(r0+66)];
	heap32[(r1)] = r2;
	r0 = heap32[(r0+67)];
	r_g0 = r0;
	return;
break;
}
}