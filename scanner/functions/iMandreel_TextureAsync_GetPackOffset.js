function iMandreel_TextureAsync_GetPackOffset(sp)
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
	var r9;
var __label__ = 0;
	i7 = sp + -1032;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r2 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	r4 = sp + -1024;
	r5 = 0;
_1: while(true){
	r6 = heapU8[r0];
	if(r6 ==0) //_LBB815_5
{
break _1;
}
else{
	r7 = r6 << 24;
	r7 = r7 >> 24;
	r7 = (r7 + -65)|0;
	r8 = 26;
	r9 = (r6 + 32)|0;
	r6 = uint(r7) < uint(r8) ? r9 : r6;
	r7 = r6 & 255;
	r8 = 47;
	r6 = r7 == 92 ? r8 : r6;
	r0 = (r0 + 1)|0;
	r7 = r6 & 255;
if(!(r7 !=47)) //_LBB815_4
{
	r7 = r5 & 255;
	r5 = r6;
	if(r7 ==47) //_LBB815_1
{
continue _1;
}
}
	r5 = (r4 + 1)|0;
	heap8[r4] = r6;
	r4 = r5;
	r5 = r6;
continue _1;
}
}
	r0 = _ZL24g_pFirstTextureAsyncInfo;
	r5 = 0;
	heap8[r4] = r5;
_8: while(true){
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	if(r0 !=0) //_LBB815_6
{
	r4 = sp + -1024;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	strcmp(i7);
	r4 = r_g0;
if(!(r4 !=0)) //_LBB815_9
{
	r4 = r0 >> 2;
	r5 = heap32[(r4+64)];
if(!(r5 ==-1)) //_LBB815_9
{
__label__ = 8;
break _8;
}
}
	r0 = (r0 + 280)|0;
continue _8;
}
else{
__label__ = 11;
break _8;
}
}
switch(__label__ ){//multiple entries
case 11:
	r0 = 0;
	r_g0 = r0;
	return;
break;
case 8:
	r0 = r1 >> 2;
	r1 = heap32[(r4+68)];
	heap32[(r0)] = r1;
	r0 = r2 >> 2;
	r1 = heap32[(r4+69)];
	heap32[(r0)] = r1;
	r0 = heap32[(r4+64)];
	r1 = _ZL17g_apPackFileNames;
	r0 = r0 << 2;
	r0 = (r1 + r0)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	strcpy(i7);
	r0 = 1;
	r_g0 = r0;
	return;
break;
}
}