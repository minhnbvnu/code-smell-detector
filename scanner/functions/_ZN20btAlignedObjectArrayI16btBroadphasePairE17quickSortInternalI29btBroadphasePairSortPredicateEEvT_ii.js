function _ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(sp)
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
	var r13;
	var r14;
	var r15;
	var r16;
	var r17;
	var r18;
	var r19;
	var r20;
	var r21;
	var r22;
	var r23;
	var r24;
	var r25;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+1)];
	r2 = (r0 + r1)|0;
	r3 = r2 >>> 31;
	r4 = heap32[(fp)];
	r2 = (r2 + r3)|0;
	r3 = r4 >> 2;
	r2 = r2 & 536870910;
	r5 = heap32[(r3+3)];
	r2 = r2 << 3;
	r2 = (r5 + r2)|0;
	r2 = r2 >> 2;
	r5 = heap32[(r2)];
	r6 = heap32[(r2+1)];
	r2 = heap32[(r2+2)];
	r7 = r1;
	r8 = r0;
_1: while(true){
	r9 = heap32[(r3+3)];
	r10 = r7 << 4;
	r10 = (r9 + r10)|0;
	r11 = 0;
_3: while(true){
	r12 = r11 << 4;
	r12 = (r10 + r12)|0;
	r12 = r12 >> 2;
	r13 = r11 << 2;
	r14 = heap32[(r12)];
	if(r14 !=0) //_LBB59_5
{
	r15 = r14 >> 2;
	r15 = heap32[(r15+3)];
}
else{
	r15 = -1;
}
	if(r5 !=0) //_LBB59_8
{
	r16 = r5 >> 2;
	r16 = heap32[(r16+3)];
}
else{
	r16 = -1;
}
	r17 = r13 << 2;
	r17 = (r10 + r17)|0;
	r17 = r17 >> 2;
	r17 = heap32[(r17+1)];
	if(r17 !=0) //_LBB59_11
{
	r18 = r17 >> 2;
	r18 = heap32[(r18+3)];
}
else{
	r18 = -1;
}
	if(r6 !=0) //_LBB59_14
{
	r19 = r6 >> 2;
	r19 = heap32[(r19+3)];
}
else{
	r19 = -1;
}
_21: do {
if(!(r15 >r16)) //_LBB59_2
{
if(!(r14 !=r5)) //_LBB59_18
{
	if(r18 >r19) //_LBB59_2
{
break _21;
}
}
	if(r14 !=r5) //_LBB59_22
{
break _3;
}
else{
	if(r17 !=r6) //_LBB59_22
{
break _3;
}
else{
	r15 = r13 << 2;
	r15 = (r10 + r15)|0;
	r15 = r15 >> 2;
	r15 = heap32[(r15+2)];
if(!(uint(r15) >uint(r2))) //_LBB59_2
{
break _3;
}
}
}
}
} while(0);
	r11 = (r11 + 1)|0;
continue _3;
}
	r18 = r8 << 4;
	r15 = (r7 + r11)|0;
	r9 = (r9 + r18)|0;
	r16 = 0;
_30: while(true){
	r19 = r16 << 2;
	if(r5 !=0) //_LBB59_25
{
	r20 = r5 >> 2;
	r20 = heap32[(r20+3)];
}
else{
	r20 = -1;
}
	r21 = r19 << 2;
	r21 = (r9 + r21)|0;
	r21 = r21 >> 2;
	r21 = heap32[(r21)];
	if(r21 !=0) //_LBB59_28
{
	r22 = r21 >> 2;
	r22 = heap32[(r22+3)];
}
else{
	r22 = -1;
}
	if(r6 !=0) //_LBB59_31
{
	r23 = r6 >> 2;
	r23 = heap32[(r23+3)];
}
else{
	r23 = -1;
}
	r24 = r19 << 2;
	r24 = (r9 + r24)|0;
	r24 = r24 >> 2;
	r24 = heap32[(r24+1)];
	if(r24 !=0) //_LBB59_34
{
	r25 = r24 >> 2;
	r25 = heap32[(r25+3)];
}
else{
	r25 = -1;
}
_48: do {
if(!(r20 >r22)) //_LBB59_21
{
if(!(r5 !=r21)) //_LBB59_38
{
	if(r23 >r25) //_LBB59_21
{
break _48;
}
}
	if(r5 !=r21) //_LBB59_41
{
break _30;
}
else{
	if(r6 !=r24) //_LBB59_41
{
break _30;
}
else{
	r20 = r19 << 2;
	r20 = (r9 + r20)|0;
	r20 = r20 >> 2;
	r20 = heap32[(r20+2)];
if(!(uint(r2) >uint(r20))) //_LBB59_21
{
break _30;
}
}
}
}
} while(0);
	r16 = (r16 + -1)|0;
continue _30;
}
	r20 = (r8 + r16)|0;
	if(r15 <=r20) //_LBB59_43
{
	r13 = r13 << 2;
	r10 = (r10 + r13)|0;
	r10 = r10 >> 2;
	r13 = heap32[(r12+3)];
	r15 = heap32[(r10+2)];
	r19 = r19 << 2;
	r19 = (r9 + r19)|0;
	heap32[(r10)] = r21;
	r20 = r16 << 4;
	r19 = r19 >> 2;
	heap32[(r10+1)] = r24;
	r19 = heap32[(r19+2)];
	r9 = (r9 + r20)|0;
	r9 = r9 >> 2;
	heap32[(r10+2)] = r19;
	r9 = heap32[(r9+3)];
	heap32[(r12+3)] = r9;
	r9 = heap32[(r3+3)];
	r9 = (r9 + r18)|0;
	r9 = (r9 + r20)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r14;
	r7 = (r7 + r11)|0;
	r8 = (r8 + r16)|0;
	heap32[(r9+1)] = r17;
	r7 = (r7 + 1)|0;
	r8 = (r8 + -1)|0;
	heap32[(r9+2)] = r15;
	heap32[(r9+3)] = r13;
}
else{
	r7 = r15;
	r8 = r20;
}
	if(r7 <=r8) //_LBB59_1
{
continue _1;
}
else{
break _1;
}
}
if(!(r8 <=r1)) //_LBB59_47
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r8;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(i7);
}
if(!(r7 >=r0)) //_LBB59_49
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r0;
	_ZN20btAlignedObjectArrayI16btBroadphasePairE17quickSortInternalI29btBroadphasePairSortPredicateEEvT_ii(i7);
}
	return;
}