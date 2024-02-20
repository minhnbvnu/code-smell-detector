function _ZNK22btBvhTriangleMeshShape30serializeSingleTriangleInfoMapEP12btSerializer(sp)
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
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = heap32[(r0+14)];
if(!(r1 ==0)) //_LBB407_2
{
	r2 = heap32[(fp+1)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+2)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r3 = r2 >> 2;
	r4 = heap32[(r3)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+4)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r_g0;
	heap32[(g0+2)] = 1;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r1 = r_g0;
	r4 = heap32[(r0+14)];
	r5 = r4 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r6 = r1 >> 2;
	r5 = heap32[(r5+3)];
	r6 = heap32[(r6+2)];
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r2;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+5)];
	r0 = heap32[(r0+14)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r_g0;
	heap32[(g0+3)] = 1346456916;
	heap32[(g0+4)] = r0;
	__FUNCTION_TABLE__[(r3)>>2](i7);
}
	return;
}