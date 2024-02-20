function strtoul(sp)
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap8[r0];
	r2 = r1 << 2;
	r3 = my_ctype;
	r2 = (r2 + r3)|0;
	r4 = heap32[(fp+1)];
	r2 = heapU8[r2+4];
	r2 = r2 & 8;
	if(r2 ==0) //_LBB792_2
{
	r2 = r0;
}
else{
	r2 = r0;
_4: while(true){
	r1 = heap8[r2+1];
	r5 = r1 << 2;
	r5 = (r5 + r3)|0;
	r2 = (r2 + 1)|0;
	r5 = heapU8[r5+4];
	r5 = r5 & 8;
	if(r5 !=0) //_LBB792_3
{
continue _4;
}
else{
break _4;
}
}
}
	r1 = r1 & 255;
	if(r1 ==43) //_LBB792_8
{
	r2 = (r2 + 1)|0;
	r1 = 0;
}
else{
	if(r1 ==45) //_LBB792_7
{
	r2 = (r2 + 1)|0;
	r1 = 1;
}
else{
	r1 = 0;
}
}
	r3 = 0;
	r5 = r3;
	r6 = r3;
	r11 = -1;
_14: while(true){
	r8 = (r2 - r3)|0;
	r7 = heapU8[r8];
	if(r7 ==0) //_LBB792_14
{
break _14;
}
else{
	if(uint(r7) <uint(65)) //_LBB792_10
{
	r9 = r7 & 255;
	r10 = 58;
	r7 = (r7 + -48)|0;
	r7 = uint(r9) < uint(r10) ? r7 : r11;
	r7 = r7 & 255;
	if(uint(r7) >uint(9)) //_LBB792_14
{
break _14;
}
else{
	r8 = r6 & 255;
	r8 = (r8 * 10)|0;
	r7 = (r7 + r8)|0;
	r6 = r6 >>> 8;
	r8 = r7 >>> 8;
	r6 = (r6 * 10)|0;
	r6 = (r8 + r6)|0;
	r8 = 16777215;
	r9 = 1;
	r10 = r6 << 8;
	r7 = r7 & 255;
	r5 = uint(r6) > uint(r8) ? r9 : r5;
	r6 = r10 | r7;
	r3 = (r3 + -1)|0;
continue _14;
}
}
else{
break _14;
}
}
}
	if(r3 ==0) //_LBB792_16
{
	_errno(i7);
	r6 = 0;
	r8 = r_g0 >> 2;
	heap32[(r8)] = 22;
	r8 = r0;
}
if(!(r4 ==0)) //_LBB792_19
{
	r0 = r4 >> 2;
	heap32[(r0)] = r8;
}
	if(r5 ==0) //_LBB792_21
{
	r0 = 0;
	r0 = (r0 - r6)|0;
	r0 = r1 == 0 ? r6 : r0;
	r_g0 = r0;
	return;
}
else{
	_errno(i7);
	r1 = r_g0 >> 2;
	heap32[(r1)] = 34;
	r1 = -1;
	r_g0 = r1;
	return;
}
}