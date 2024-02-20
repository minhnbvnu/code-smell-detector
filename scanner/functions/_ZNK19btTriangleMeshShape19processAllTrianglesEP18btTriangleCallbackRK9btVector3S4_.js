function _ZNK19btTriangleMeshShape19processAllTrianglesEP18btTriangleCallbackRK9btVector3S4_(sp)
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
	i7 = sp + -56;var g0 = i7>>2; // save stack
	r0 = _ZTVZNK19btTriangleMeshShape19processAllTrianglesEP18btTriangleCallbackRK9btVector3S4_E16FilteredCallback;
	r1 = sp + -40;
	r0 = (r0 + 8)|0;
	r2 = heap32[(fp+2)];
	r3 = r1 >> 2;
	r4 = heap32[(fp+1)];
	heap32[(fp+-10)] = r0;
	r0 = r2 >> 2;
	heap32[(r3+1)] = r4;
	heap32[(r3+2)] = heap32[(r0)];
	heap32[(r3+3)] = heap32[(r0+1)];
	r4 = heap32[(fp+3)];
	heap32[(r3+4)] = heap32[(r0+2)];
	r5 = r4 >> 2;
	heap32[(r3+5)] = heap32[(r0+3)];
	heap32[(r3+6)] = heap32[(r5)];
	heap32[(r3+7)] = heap32[(r5+1)];
	r0 = heap32[(fp)];
	heap32[(r3+8)] = heap32[(r5+2)];
	r0 = r0 >> 2;
	heap32[(r3+9)] = heap32[(r5+3)];
	r0 = heap32[(r0+12)];
	r3 = r0 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3+2)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r2;
	heap32[(g0+3)] = r4;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	return;
}