function _ZN20btAlignedObjectArrayI9btElementE17quickSortInternalI31btUnionFindElementSortPredicateEEvT_ii(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+1)];
	r2 = (r0 + r1)|0;
	r3 = r2 >>> 31;
	r4 = heap32[(fp)];
	r2 = (r2 + r3)|0;
	r3 = r4 >> 2;
	r2 = r2 & 1073741822;
	r5 = heap32[(r3+3)];
	r2 = r2 << 2;
	r2 = (r5 + r2)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r5 = r1;
	r6 = r0;
_1: while(true){
	r7 = heap32[(r3+3)];
	r8 = r5 << 3;
	r8 = (r7 + r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
	if(r8 <r2) //_LBB368_3
{
_4: while(true){
	r8 = r5 << 3;
	r8 = (r7 + r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8+2)];
	r5 = (r5 + 1)|0;
	if(r8 <r2) //_LBB368_3
{
continue _4;
}
else{
break _4;
}
}
}
	r9 = r6 << 3;
	r9 = (r7 + r9)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
_7: do {
	if(r2 <r9) //_LBB368_6
{
_8: while(true){
	r9 = r6 << 3;
	r9 = (r7 + r9)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9+-2)];
	r6 = (r6 + -1)|0;
	if(r2 <r9) //_LBB368_6
{
continue _8;
}
else{
break _7;
}
}
}
} while(0);
	if(r5 <=r6) //_LBB368_9
{
	r10 = r5 << 3;
	r11 = r6 << 3;
	r10 = (r7 + r10)|0;
	r7 = (r7 + r11)|0;
	r10 = r10 >> 2;
	r7 = r7 >> 2;
	r12 = heap32[(r10+1)];
	r7 = heap32[(r7+1)];
	heap32[(r10)] = r9;
	heap32[(r10+1)] = r7;
	r7 = heap32[(r3+3)];
	r7 = (r7 + r11)|0;
	r7 = r7 >> 2;
	r5 = (r5 + 1)|0;
	r6 = (r6 + -1)|0;
	heap32[(r7)] = r8;
	heap32[(r7+1)] = r12;
}
	if(r5 <=r6) //_LBB368_1
{
continue _1;
}
else{
break _1;
}
}
if(!(r6 <=r1)) //_LBB368_13
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r6;
	_ZN20btAlignedObjectArrayI9btElementE17quickSortInternalI31btUnionFindElementSortPredicateEEvT_ii(i7);
}
if(!(r5 >=r0)) //_LBB368_15
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r0;
	_ZN20btAlignedObjectArrayI9btElementE17quickSortInternalI31btUnionFindElementSortPredicateEEvT_ii(i7);
}
	return;
}