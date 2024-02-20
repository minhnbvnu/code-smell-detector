function _ZN4__rwL13__rw_vfmtwhatEPcjPKcS0_(sp)
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
	var r12;
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = _ZN4__rwL16__rw_what_refcntE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+1)];
	r4 = (r1 + 1)|0;
	heap32[(r0)] = r4;
	if(r1 !=0) //_LBB697_2
{
	heap32[(g0)] = 256;
	_Znaj(i7);
	r1 = r_g0;
	r4 = heap32[(r0)];
	r4 = (r4 + -1)|0;
	heap32[(r0)] = r4;
}
else{
	r1 = _ZN4__rwL13__rw_what_bufE;
}
	r4 = 256;
	r12 = swrite__index__;
_5: while(true){
	r5 = sp + -16;
	heap32[(fp+-8)] = r3;
	r6 = r5 >> 2;
	heap32[(fp+-7)] = r3;
	r7 = (r4 + -1)|0;
	r8 = 0;
	heap32[(r6+1)] = 0;
	r9 = sp + -24;
	r10 = r4 == 0 ? r8 : r7;
	heap32[(fp+-4)] = r1;
	r11 = r9 >> 2;
	heap32[(r6+2)] = r10;
	heap32[(r11+1)] = r12;
	heap32[(fp+-6)] = r5;
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r3;
	__v_printf(i7);
	r5 = r_g0;
_7: do {
if(!(r1 ==0)) //_LBB697_11
{
if(!(r4 ==0)) //_LBB697_11
{
if(!(r5 <0)) //_LBB697_11
{
if(!(r4 ==-1)) //_LBB697_10
{
if(!(uint(r5) <uint(r4))) //_LBB697_10
{
	heap8[r1+r7] = r8;
break _7;
}
}
	heap8[r1+r5] = r8;
}
}
}
} while(0);
	r5 = r5 < 0 ? r8 : r5;
	r5 = r7 > r5 ? r5 : r8;
	if(r5 !=0) //_LBB697_13
{
	if(r4 >r5) //_LBB697_20
{
break _5;
}
else{
	r4 = (r5 + 1)|0;
}
}
else{
	r4 = r4 << 1;
}
	r5 = _ZN4__rwL13__rw_what_bufE;
	if(r1 !=r5) //_LBB697_17
{
if(!(r1 ==0)) //_LBB697_19
{
	heap32[(g0)] = r1;
	_ZdaPv(i7);
}
}
else{
	r1 = heap32[(r0)];
	r1 = (r1 + -1)|0;
	heap32[(r0)] = r1;
}
	heap32[(g0)] = r4;
	_Znaj(i7);
	r1 = r_g0;
continue _5;
}
	r_g0 = r1;
	return;
}