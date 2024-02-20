function _ZNK17btCollisionObject21serializeSingleObjectEP12btSerializer(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(r1)];
	r2 = r2 >> 2;
	r2 = heap32[(r2+4)];
	heap32[(g0)] = r0;
	r3 = heap32[(fp+1)];
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r4 = r3 >> 2;
	r5 = heap32[(r4)];
	r5 = r5 >> 2;
	r5 = heap32[(r5+4)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r_g0;
	heap32[(g0+2)] = 1;
	__FUNCTION_TABLE__[(r5)>>2](i7);
	r2 = r_g0;
	r1 = heap32[(r1)];
	r1 = r1 >> 2;
	r5 = r2 >> 2;
	r1 = heap32[(r1+5)];
	r5 = heap32[(r5+2)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r3;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r4 = heap32[(r4+5)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r_g0;
	heap32[(g0+3)] = 1245859651;
	heap32[(g0+4)] = r0;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	return;
}