function _ZN4__rw14__rw_cat_closeEi(sp)
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
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	heap32[(fp+-1)] = r0;
if(!(r0 <0)) //_LBB711_20
{
	r0 = sp + -4;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = 0;
	_ZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataE(i7);
	r1 = r_g0;
if(!(r1 ==0)) //_LBB711_20
{
	r2 = r1 >> 2;
	r2 = heap32[(r2)];
if(!(r2 ==-1)) //_LBB711_20
{
	r3 = _ZN4__rwL12__rw_catlistE_2E_1;
	r4 = _ZN4__rwL12__rw_catlistE_2E_0;
	r3 = r3 >> 2;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r6 = heap32[(r3)];
	r6 = (r6 - r5)|0;
	r6 = r6 >> 2;
	r7 = 0;
_5: while(true){
	if(uint(r6) >uint(r7)) //_LBB711_9
{
	r8 = r7 << 2;
	r8 = (r5 + r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
	if(r8 ==0) //_LBB711_8
{
__label__ = 7;
break _5;
}
else{
	if(r8 !=r2) //_LBB711_6
{
	r7 = (r7 + 1)|0;
}
else{
__label__ = 9;
break _5;
}
}
}
else{
__label__ = 7;
break _5;
}
}
if (__label__ == 7){
	r7 = r6;
}
_13: do {
if(!(uint(r6) <=uint(r7))) //_LBB711_19
{
	r2 = r7 << 2;
	r6 = (r5 + r2)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	if(r6 !=0) //_LBB711_13
{
	heap32[(g0)] = r6;
	_ZdlPv(i7);
	r5 = heap32[(r4)];
}
	r2 = (r5 + r2)|0;
	r4 = (r7 + 1)|0;
	r2 = r2 >> 2;
	heap32[(r2)] = 0;
_18: while(true){
	r2 = heap32[(r3)];
	r2 = (r2 - r5)|0;
	r2 = r2 >> 2;
	if(uint(r2) <=uint(r4)) //_LBB711_19
{
break _13;
}
else{
	r2 = r4 << 2;
	r2 = (r5 + r2)|0;
	r6 = r2 >> 2;
	r2 = heap32[(r6)];
	if(r2 !=0) //_LBB711_15
{
	r4 = (r4 + 1)|0;
	heap32[(r6+-1)] = r2;
}
else{
break _18;
}
}
}
	heap32[(r6)] = 0;
}
} while(0);
	r2 = (r1 + 4)|0;
	heap32[(g0)] = r2;
	_ZNSt6localeD1Ev(i7);
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	_ZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataE(i7);
	return;
}
}
}
	r0 = _2E_str115180;
	r1 = _2E_str1116181;
	heap32[(g0)] = 7;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r1;
	_ZN4__rw10__rw_throwEiz(i7);
	return;
}