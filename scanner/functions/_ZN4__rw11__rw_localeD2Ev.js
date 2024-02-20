function _ZN4__rw11__rw_localeD2Ev(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+38)];
	r3 = (r0 + 112)|0;
	if(r2 ==r3) //_LBB705_2
{
__label__ = 2;
}
else{
	if(r2 !=0) //_LBB705_3
{
	r3 = 0;
	heap32[(g0)] = r2;
	_ZdaPv(i7);
__label__ = 4;
}
else{
__label__ = 2;
}
}
if (__label__ == 2){
	r3 = 0;
}
_6: while(true){
	r2 = r3 << 2;
	r2 = (r0 - r2)|0;
	r2 = r2 >> 2;
	r4 = 0;
	r2 = heap32[(r2)];
if(!(r2 ==0)) //_LBB705_10
{
	r5 = r2 >> 2;
	r6 = heap32[(r5+5)];
	if(r6 ==0) //_LBB705_7
{
	r2 = heap32[(r5+6)];
	r2 = (r2 + -1)|0;
	heap32[(r5+6)] = r2;
if(!(r2 !=0)) //_LBB705_10
{
	r2 = (r4 - r3)|0;
	r2 = r2 << 2;
	r2 = (r0 + r2)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
if(!(r2 ==0)) //_LBB705_10
{
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+1)];
	heap32[(g0)] = r2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
}
}
}
else{
	r5 = heap32[(r5+1)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = 0;
	_ZN4__rw10__rw_facet9_C_manageEPS0_NS0_13_C_facet_typeEPKcPFS1_jS4_E(i7);
}
}
	r3 = (r3 + -1)|0;
	if(r3 !=-26) //_LBB705_4
{
continue _6;
}
else{
break _6;
}
}
	r0 = heap32[(r1+26)];
	r2 = heap32[(r1+27)];
_17: do {
if(!(r2 ==0)) //_LBB705_13
{
_18: while(true){
	r2 = r4 << 2;
	r0 = (r0 + r2)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	r0 = r0 >> 2;
	r3 = heap32[(r0+6)];
	r3 = (r3 + -1)|0;
	heap32[(r0+6)] = r3;
if(!(r3 !=0)) //_LBB705_17
{
	r0 = heap32[(r1+26)];
	r0 = (r0 + r2)|0;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
if(!(r0 ==0)) //_LBB705_17
{
	r2 = r0 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+1)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r2)>>2](i7);
}
}
	r4 = (r4 + 1)|0;
	r0 = heap32[(r1+26)];
	r2 = heap32[(r1+27)];
	if(r4 !=r2) //_LBB705_14
{
continue _18;
}
else{
break _17;
}
}
}
} while(0);
if(!(r0 ==0)) //_LBB705_20
{
	heap32[(g0)] = r0;
	_ZdaPv(i7);
}
	return;
}