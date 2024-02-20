function _ZN19btTriangleMeshShape15recalcLocalAabbEv(sp)
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
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -64;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = 0;
_1: while(true){
	r2 = sp + -16;
	r3 = r2 >> 2;
	heap32[(fp+-4)] = 0;
	heap32[(r3+1)] = 0;
	heap32[(r3+2)] = 0;
	r4 = (r2 + r1)|0;
	heap32[(r3+3)] = 0;
	r3 = r4 >> 2;
	heap32[(r3)] = 1065353216;
	r4 = r0 >> 2;
	r5 = heap32[(r4)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+16)];
	r6 = sp + -32;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	r7 = (r6 + r1)|0;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r5 = r7 >> 2;
	r7 = (r0 + r1)|0;
	f0 = heapFloat[(r5)];
	f1 = heapFloat[(r4+3)];
	f0 = f0+f1;
	r7 = r7 >> 2;
	heapFloat[(r7+8)] = f0;
	heap32[(r3)] = -1082130432;
	r3 = heap32[(r4)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+16)];
	r8 = sp + -48;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r2;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r2 = r6 >> 2;
	r3 = r8 >> 2;
	heap32[(fp+-8)] = heap32[(fp+-12)];
	heap32[(r2+1)] = heap32[(r3+1)];
	heap32[(r2+2)] = heap32[(r3+2)];
	heap32[(r2+3)] = heap32[(r3+3)];
	f0 = heapFloat[(r5)];
	f1 = heapFloat[(r4+3)];
	r1 = (r1 + 4)|0;
	f0 = f0-f1;
	heapFloat[(r7+4)] = f0;
	if(r1 !=12) //_LBB512_1
{
continue _1;
}
else{
break _1;
}
}
	return;
}