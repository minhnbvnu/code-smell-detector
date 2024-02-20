function strtol(sp)
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
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap8[r0];
	r2 = r1 << 2;
	r3 = my_ctype;
	r2 = (r2 + r3)|0;
	r4 = heap32[(fp+1)];
	r2 = heapU8[r2+4];
	r2 = r2 & 8;
	if(r2 ==0) //_LBB793_2
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
	if(r5 !=0) //_LBB793_3
{
continue _4;
}
else{
break _4;
}
}
}
	r1 = r1 & 255;
	if(r1 ==45) //_LBB793_6
{
	r1 = heap8[r2+1];
	r1 = r1 << 2;
	r3 = (r1 + r3)|0;
	r3 = heapU16[(r3+4)>>1];
	r3 = r3 & 263;
	if(r3 ==0) //_LBB793_5
{
__label__ = 5;
}
else{
	r2 = (r2 + 1)|0;
	r3 = -1;
__label__ = 8;
}
}
else{
__label__ = 5;
}
if (__label__ == 5){
	r3 = 0;
}
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r4;
	strtoul(i7);
	r1 = r_g0;
if(!(r4 ==0)) //_LBB793_11
{
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
if(!(r5 !=r2)) //_LBB793_11
{
	heap32[(r4)] = r0;
}
}
	if(r1 >-1) //_LBB793_16
{
	r0 = 0;
	r0 = (r0 - r1)|0;
	r0 = r3 == 0 ? r1 : r0;
	r_g0 = r0;
	return;
}
else{
	_errno(i7);
	r0 = r_g0;
if(!(r1 !=-2147483648)) //_LBB793_15
{
if(!(r3 ==0)) //_LBB793_15
{
	r0 = r0 >> 2;
	heap32[(r0)] = 0;
	r_g0 = r1;
	return;
}
}
	r1 = r0 >> 2;
	r0 = 2147483647;
	r2 = -2147483648;
	heap32[(r1)] = 34;
	r1 = r3 == 0 ? r0 : r2;
	r_g0 = r1;
	return;
}
}