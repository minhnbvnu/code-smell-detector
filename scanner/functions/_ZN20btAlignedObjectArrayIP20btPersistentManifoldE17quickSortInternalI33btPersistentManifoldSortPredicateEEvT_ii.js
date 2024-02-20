function _ZN20btAlignedObjectArrayIP20btPersistentManifoldE17quickSortInternalI33btPersistentManifoldSortPredicateEEvT_ii(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+1)];
	r2 = (r0 + r1)|0;
	r3 = r2 >>> 31;
	r4 = heap32[(fp)];
	r2 = (r2 + r3)|0;
	r3 = r4 >> 2;
	r2 = r2 & 2147483646;
	r5 = heap32[(r3+3)];
	r2 = r2 << 1;
	r2 = (r5 + r2)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
	r5 = r1;
	r6 = r0;
_1: while(true){
	r7 = r2 >> 2;
	r8 = heap32[(r7+277)];
	r8 = r8 >> 2;
	r9 = heap32[(r3+3)];
	r8 = heap32[(r8+52)];
_3: while(true){
	r10 = r5 << 2;
	r10 = (r9 + r10)|0;
	r10 = r10 >> 2;
	r11 = heap32[(r10)];
	r12 = r11 >> 2;
	r13 = heap32[(r12+277)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+52)];
	if(r13 <0) //_LBB354_5
{
	r13 = heap32[(r12+278)];
	r13 = r13 >> 2;
	r13 = heap32[(r13+52)];
}
	if(r8 <0) //_LBB354_8
{
	r12 = heap32[(r7+278)];
	r12 = r12 >> 2;
	r12 = heap32[(r12+52)];
}
else{
	r12 = r8;
}
	if(r13 <r12) //_LBB354_2
{
	r5 = (r5 + 1)|0;
continue _3;
}
else{
break _3;
}
}
_13: while(true){
	r12 = r6 << 2;
	r13 = (r9 + r12)|0;
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
	if(r8 <0) //_LBB354_13
{
	r14 = heap32[(r7+278)];
	r14 = r14 >> 2;
	r14 = heap32[(r14+52)];
}
else{
	r14 = r8;
}
	r15 = r13 >> 2;
	r16 = heap32[(r15+277)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+52)];
	if(r16 <0) //_LBB354_16
{
	r16 = heap32[(r15+278)];
	r16 = r16 >> 2;
	r16 = heap32[(r16+52)];
}
	if(r14 <r16) //_LBB354_10
{
	r6 = (r6 + -1)|0;
continue _13;
}
else{
break _13;
}
}
	if(r5 <=r6) //_LBB354_20
{
	heap32[(r10)] = r13;
	r7 = heap32[(r3+3)];
	r7 = (r7 + r12)|0;
	r5 = (r5 + 1)|0;
	r6 = (r6 + -1)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r11;
}
	if(r5 <=r6) //_LBB354_1
{
continue _1;
}
else{
break _1;
}
}
if(!(r6 <=r1)) //_LBB354_24
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r6;
	_ZN20btAlignedObjectArrayIP20btPersistentManifoldE17quickSortInternalI33btPersistentManifoldSortPredicateEEvT_ii(i7);
}
if(!(r5 >=r0)) //_LBB354_26
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r0;
	_ZN20btAlignedObjectArrayIP20btPersistentManifoldE17quickSortInternalI33btPersistentManifoldSortPredicateEEvT_ii(i7);
}
	return;
}