function _ZN21btCollisionDispatcher14getNewManifoldEPvS0_(sp)
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
	var r10;
	var r11;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = gNumManifold;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	r2 = heap32[(fp)];
	r3 = heap32[(fp+1)];
	r4 = heap32[(fp+2)];
	heap32[(r0)] = r1;
	r0 = heapU8[r2+4];
	r0 = r0 & 2;
	if(r0 !=0) //_LBB180_2
{
	r0 = r4 >> 2;
	r0 = heap32[(r0+48)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 1017370378;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	f0 = f_g0;
	r0 = r3 >> 2;
	heapFloat[(fp+-2)] = f0;
	r0 = heap32[(r0+48)];
	r1 = r0 >> 2;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 1017370378;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r0 = sp + -4;
	r1 = sp + -8;
	r0 = f_g0 < f0 ? r0 : r1;
	heapFloat[(fp+-1)] = f_g0;
}
else{
	r0 = gContactBreakingThreshold;
}
	r1 = r2 >> 2;
	r5 = heap32[(r1+49)];
	r6 = r3 >> 2;
	r7 = r4 >> 2;
	r5 = r5 >> 2;
	r0 = r0 >> 2;
	f0 = heapFloat[(r6+46)];
	f1 = heapFloat[(r7+46)];
	r6 = heap32[(r5+2)];
	f2 = heapFloat[(r0)];
	f0 = f0 < f1 ? f0 : f1;
_5: do {
	if(r6 ==0) //_LBB180_9
{
	r0 = gNumAlignedAllocs;
	r0 = r0 >> 2;
	r5 = heap32[(r0)];
	r5 = (r5 + 1)|0;
	heap32[(r0)] = r5;
	heap32[(g0)] = 1159;
	malloc(i7);
	r0 = r_g0;
	if(r0 !=0) //_LBB180_11
{
	r5 = 0;
	r6 = (r0 + 4)|0;
	r5 = (r5 - r6)|0;
	r5 = r5 & 15;
	r5 = (r0 + r5)|0;
	r6 = (r5 + 4)|0;
	r5 = r5 >> 2;
	heap32[(r5)] = r0;
	r0 = r6;
}
else{
break _5;
}
}
else{
	r0 = heap32[(r5)];
	if(r0 >1139) //_LBB180_6
{
	if(r6 >0) //_LBB180_8
{
	r0 = heap32[(r5+3)];
	r7 = r0 >> 2;
	r7 = heap32[(r7)];
	r6 = (r6 + -1)|0;
	heap32[(r5+3)] = r7;
	heap32[(r5+2)] = r6;
}
else{
	r1 = _2E_str371;
	r2 = _2E_str169;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 70;
	_assert(i7);
}
}
else{
	r1 = _2E_str270;
	r2 = _2E_str169;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = 69;
	_assert(i7);
}
}
} while(0);
	r5 = r0 >> 2;
	heap32[(r5)] = 1;
	heap32[(r5+28)] = 0;
	r6 = 0;
	heap32[(r5+29)] = 0;
	heap8[r0+120] = r6;
	heap32[(r5+31)] = 0;
	heap32[(r5+32)] = 0;
	heap32[(r5+33)] = 0;
	heap32[(r5+34)] = 0;
	heap32[(r5+35)] = 0;
	heap32[(r5+36)] = 0;
	heap32[(r5+37)] = 0;
	heap32[(r5+97)] = 0;
	heap32[(r5+98)] = 0;
	heap8[r0+396] = r6;
	heap32[(r5+100)] = 0;
	heap32[(r5+101)] = 0;
	heap32[(r5+102)] = 0;
	heap32[(r5+103)] = 0;
	heap32[(r5+104)] = 0;
	heap32[(r5+105)] = 0;
	heap32[(r5+106)] = 0;
	heap32[(r5+166)] = 0;
	heap32[(r5+167)] = 0;
	heap8[r0+672] = r6;
	heap32[(r5+169)] = 0;
	heap32[(r5+170)] = 0;
	heap32[(r5+171)] = 0;
	heap32[(r5+172)] = 0;
	heap32[(r5+173)] = 0;
	heap32[(r5+174)] = 0;
	heap32[(r5+175)] = 0;
	heap32[(r5+235)] = 0;
	heap32[(r5+236)] = 0;
	heap8[r0+948] = r6;
	heap32[(r5+238)] = 0;
	heap32[(r5+239)] = 0;
	heap32[(r5+240)] = 0;
	heap32[(r5+241)] = 0;
	heap32[(r5+242)] = 0;
	heap32[(r5+243)] = 0;
	heap32[(r5+244)] = 0;
	heap32[(r5+277)] = r3;
	heap32[(r5+278)] = r4;
	heap32[(r5+279)] = 0;
	heapFloat[(r5+280)] = f2;
	heapFloat[(r5+281)] = f0;
	r3 = heap32[(r1+3)];
	heap32[(r5+284)] = r3;
	r3 = heap32[(r1+4)];
	r4 = heap32[(r1+3)];
	if(r3 ==r4) //_LBB180_14
{
	r5 = 1;
	r7 = r4 << 1;
	r7 = r4 == 0 ? r5 : r7;
if(!(r3 >=r7)) //_LBB180_13
{
	if(r7 !=0) //_LBB180_17
{
	r3 = gNumAlignedAllocs;
	r3 = r3 >> 2;
	r8 = heap32[(r3)];
	r9 = r7 << 2;
	r8 = (r8 + 1)|0;
	r9 = r9 | 3;
	heap32[(r3)] = r8;
	r3 = (r9 + 16)|0;
	heap32[(g0)] = r3;
	malloc(i7);
	r3 = r_g0;
	if(r3 !=0) //_LBB180_19
{
	r8 = (r3 + 4)|0;
	r8 = (r6 - r8)|0;
	r8 = r8 & 15;
	r8 = (r3 + r8)|0;
	r9 = (r8 + 4)|0;
	r8 = r8 >> 2;
	heap32[(r8)] = r3;
	r3 = r9;
}
}
else{
	r3 = 0;
}
	r8 = (r2 + 20)|0;
	if(r4 <1) //_LBB180_22
{
	r6 = r8 >> 2;
	r9 = heap32[(r6)];
}
else{
_26: while(true){
	r9 = r8 >> 2;
	r9 = heap32[(r9)];
	r10 = r6 << 2;
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r10 = (r3 + r10)|0;
	r11 = heap32[(r11)];
	r6 = (r6 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r11;
if(!(r4 !=r6)) //_LBB180_23
{
break _26;
}
}
	r8 = (r2 + 20)|0;
}
	if(r9 !=0) //_LBB180_27
{
	r6 = heapU8[r2+24];
	if(r6 !=0) //_LBB180_29
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r6 = heap32[(r4)];
	r6 = (r6 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r4)] = r6;
	r4 = heap32[(r9+-1)];
	heap32[(g0)] = r4;
	free(i7);
	r4 = heap32[(r1+3)];
}
	r6 = r8 >> 2;
	heap32[(r6)] = 0;
}
	r6 = r8 >> 2;
	heap8[r2+24] = r5;
	heap32[(r6)] = r3;
	heap32[(r1+4)] = r7;
}
}
	r2 = r4 << 2;
	r3 = heap32[(r1+5)];
	r2 = (r3 + r2)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = r0;
	r2 = heap32[(r1+3)];
	r2 = (r2 + 1)|0;
	heap32[(r1+3)] = r2;
	r_g0 = r0;
	return;
}