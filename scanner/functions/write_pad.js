function write_pad(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	if(r0 >0) //_LBB739_2
{
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r2 = heap32[(r1)];
	r2 = (r2 + r0)|0;
	if(uint(r2) >=uint(r0)) //_LBB739_4
{
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+3)];
	if(uint(r0) >uint(15)) //_LBB739_6
{
	r4 = 48;
	r4 = r3 == r4;
	r4 = r4 & 1;
	r5 = _ZL8pad_line;
	r4 = r4 << 5;
	r4 = (r5 + r4)|0;
	r5 = 0;
_7: while(true){
	r6 = r2 >> 2;
	r7 = heap32[(r6+1)];
	r6 = heap32[(r6)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 16;
	heap32[(g0+2)] = r6;
	r5 = (r5 + -16)|0;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r6 = (r0 + r5)|0;
if(!(uint(r6) >uint(15))) //_LBB739_7
{
break _7;
}
}
	r0 = 0;
	r4 = (r0 - r5)|0;
	if(r6 ==0) //_LBB739_10
{
__label__ = 11;
}
else{
	r0 = r6;
__label__ = 10;
}
}
else{
	r4 = 0;
__label__ = 10;
}
if (__label__ == 10){
	r5 = 48;
	r2 = r2 >> 2;
	r3 = r3 == r5;
	r3 = r3 & 1;
	r5 = heap32[(r2+1)];
	r2 = heap32[(r2)];
	r6 = _ZL8pad_line;
	r3 = r3 << 5;
	r3 = (r6 + r3)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	r4 = (r4 + r0)|0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
	r0 = heap32[(r1)];
	r0 = (r0 + r4)|0;
	heap32[(r1)] = r0;
	r0 = 0;
}
else{
	r0 = -1;
}
}
else{
	r0 = 0;
}
	r_g0 = r0;
	return;
}