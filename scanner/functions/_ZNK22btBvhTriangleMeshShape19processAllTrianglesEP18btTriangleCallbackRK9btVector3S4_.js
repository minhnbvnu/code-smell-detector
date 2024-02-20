function _ZNK22btBvhTriangleMeshShape19processAllTrianglesEP18btTriangleCallbackRK9btVector3S4_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
var __label__ = 0;
	i7 = sp + -80;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r0 = r0 >> 2;
	r1 = _ZTVZNK22btBvhTriangleMeshShape19processAllTrianglesEP18btTriangleCallbackRK9btVector3S4_E21MyNodeOverlapCallback;
	r2 = sp + -64;
	r3 = heap32[(r0+12)];
	r1 = (r1 + 8)|0;
	r4 = r2 >> 2;
	heap32[(fp+-16)] = r1;
	r1 = heap32[(fp+1)];
	heap32[(r4+1)] = r3;
	heap32[(r4+2)] = r1;
	r0 = heap32[(r0+13)];
	r1 = heap32[(fp+2)];
	r3 = heap32[(fp+3)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r3;
	_ZNK14btQuantizedBvh26reportAabbOverlappingNodexEP21btNodeOverlapCallbackRK9btVector3S4_(i7);
	return;
}