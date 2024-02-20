function _ZN23btDiscreteDynamicsWorld9serializeEP12btSerializer(sp)
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
	r0 = heap32[(fp+1)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+8)];
	r3 = heap32[(fp)];
	heap32[(g0)] = r0;
	r4 = r3 >> 2;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = heap32[(r4+2)];
if(!(r2 <1)) //_LBB647_5
{
	r2 = 0;
_3: while(true){
	r5 = heap32[(r4+4)];
	r6 = r2 << 2;
	r5 = (r5 + r6)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r6 = heapU8[r5+232];
	r6 = r6 & 2;
if(!(r6 ==0)) //_LBB647_4
{
	r6 = r5 >> 2;
	r7 = heap32[(r6)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+4)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r8 = heap32[(r1)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+4)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r_g0;
	heap32[(g0+2)] = 1;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r7 = r_g0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r8 = r7 >> 2;
	r6 = heap32[(r6+5)];
	r8 = heap32[(r8+2)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r8 = heap32[(r1)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r_g0;
	heap32[(g0+3)] = 1497645650;
	heap32[(g0+4)] = r5;
	__FUNCTION_TABLE__[(r8)>>2](i7);
}
	r2 = (r2 + 1)|0;
	r5 = heap32[(r4+2)];
	if(r5 >r2) //_LBB647_2
{
continue _3;
}
else{
break _3;
}
}
}
	r2 = heap32[(r4+47)];
_9: do {
if(!(r2 <1)) //_LBB647_8
{
	r2 = 0;
_11: while(true){
	r5 = r2 << 2;
	r6 = heap32[(r4+49)];
	r5 = (r6 + r5)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r6 = r5 >> 2;
	r7 = heap32[(r6)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+9)];
	heap32[(g0)] = r5;
	__FUNCTION_TABLE__[(r7)>>2](i7);
	r8 = heap32[(r1)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+4)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r_g0;
	heap32[(g0+2)] = 1;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r7 = r_g0;
	r6 = heap32[(r6)];
	r6 = r6 >> 2;
	r8 = r7 >> 2;
	r6 = heap32[(r6+10)];
	r8 = heap32[(r8+2)];
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r0;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r8 = heap32[(r1)];
	r8 = r8 >> 2;
	r8 = heap32[(r8+5)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r_g0;
	heap32[(g0+3)] = 1397641027;
	heap32[(g0+4)] = r5;
	r2 = (r2 + 1)|0;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r5 = heap32[(r4+47)];
	if(r5 >r2) //_LBB647_7
{
continue _11;
}
else{
break _9;
}
}
}
} while(0);
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	_ZN16btCollisionWorld25serializeCollisionObjectsEP12btSerializer(i7);
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+9)];
	heap32[(g0)] = r0;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	return;
}