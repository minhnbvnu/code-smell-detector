function _ZN22btBvhTriangleMeshShapeD0Ev(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = _ZTV22btBvhTriangleMeshShape;
	r2 = r0 >> 2;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	r1 = heapU8[r0+61];
	if(r1 ==0) //_LBB413_3
{
__label__ = 3;
}
else{
	r1 = heap32[(r2+13)];
	r3 = r1 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	heap32[(g0)] = r1;
	__FUNCTION_TABLE__[(r3)>>2](i7);
	r1 = heap32[(r2+13)];
	if(r1 ==0) //_LBB413_3
{
__label__ = 3;
}
else{
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r3 = heap32[(r0)];
	r3 = (r3 + 1)|0;
	r1 = r1 >> 2;
	heap32[(r0)] = r3;
	r0 = heap32[(r1+-1)];
	r1 = _ZTV14btConcaveShape;
	heap32[(g0)] = r0;
	r0 = (r1 + 8)|0;
	free(i7);
	heap32[(r2)] = r0;
__label__ = 4;
}
}
if (__label__ == 3){
	r1 = _ZTV14btConcaveShape;
	r1 = (r1 + 8)|0;
	heap32[(r2)] = r1;
	if(r0 ==0) //_LBB413_5
{
__label__ = 5;
}
else{
__label__ = 4;
}
}
if (__label__ == 4){
	r0 = gNumAlignedFree;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r1 = (r1 + 1)|0;
	heap32[(r0)] = r1;
	r0 = heap32[(r2+-1)];
	heap32[(g0)] = r0;
	free(i7);
}
	return;
}