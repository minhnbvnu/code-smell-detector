function _ZN30btGjkEpaPenetrationDepthSolver12calcPenDepthER22btVoronoiSimplexSolverPK13btConvexShapeS4_RK11btTransformS7_R9btVector3S9_S9_P12btIDebugDrawP12btStackAlloc(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
var __label__ = 0;
	i7 = sp + -104;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+4)];
	r1 = heap32[(fp+5)];
	r2 = r0 >> 2;
	r3 = r1 >> 2;
	f0 = heapFloat[(r2+14)];
	f1 = heapFloat[(r3+14)];
	f2 = heapFloat[(r2+13)];
	f3 = heapFloat[(r3+13)];
	f4 = heapFloat[(r2+12)];
	f5 = heapFloat[(r3+12)];
	r2 = sp + -16;
	f4 = f4-f5;
	r3 = r2 >> 2;
	f2 = f2-f3;
	heapFloat[(fp+-4)] = f4;
	f0 = f0-f1;
	heapFloat[(r3+1)] = f2;
	heapFloat[(r3+2)] = f0;
	heap32[(r3+3)] = 0;
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+3)];
	r5 = sp + -72;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = r2;
	heap32[(g0+5)] = r5;
	heap32[(g0+6)] = 1;
	r6 = heap32[(fp+6)];
	r7 = heap32[(fp+7)];
	r8 = heap32[(fp+8)];
	_ZN15btGjkEpaSolver211PenetrationEPK13btConvexShapeRK11btTransformS2_S5_RK9btVector3RNS_8sResultsEb(i7);
	r9 = r_g0;
	if(r9 ==0) //_LBB551_2
{
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r1;
	heap32[(g0+4)] = r2;
	heap32[(g0+5)] = r5;
	_ZN15btGjkEpaSolver28DistanceEPK13btConvexShapeRK11btTransformS2_S5_RK9btVector3RNS_8sResultsE(i7);
	r0 = r_g0;
if(!(r0 ==0)) //_LBB551_4
{
	r0 = r5 >> 2;
	r1 = r7 >> 2;
	heap32[(r1)] = heap32[(r0+1)];
	heap32[(r1+1)] = heap32[(r0+2)];
	heap32[(r1+2)] = heap32[(r0+3)];
	r2 = r8 >> 2;
	heap32[(r1+3)] = heap32[(r0+4)];
	heap32[(r2)] = heap32[(r0+5)];
	heap32[(r2+1)] = heap32[(r0+6)];
	heap32[(r2+2)] = heap32[(r0+7)];
	r1 = r6 >> 2;
	heap32[(r2+3)] = heap32[(r0+8)];
	heap32[(r1)] = heap32[(r0+9)];
	heap32[(r1+1)] = heap32[(r0+10)];
	heap32[(r1+2)] = heap32[(r0+11)];
	heap32[(r1+3)] = heap32[(r0+12)];
}
	r0 = 0;
	r_g0 = r0;
	return;
}
else{
	r0 = r5 >> 2;
	r1 = r7 >> 2;
	heap32[(r1)] = heap32[(r0+1)];
	heap32[(r1+1)] = heap32[(r0+2)];
	heap32[(r1+2)] = heap32[(r0+3)];
	r2 = r8 >> 2;
	heap32[(r1+3)] = heap32[(r0+4)];
	heap32[(r2)] = heap32[(r0+5)];
	heap32[(r2+1)] = heap32[(r0+6)];
	heap32[(r2+2)] = heap32[(r0+7)];
	r1 = r6 >> 2;
	heap32[(r2+3)] = heap32[(r0+8)];
	heap32[(r1)] = heap32[(r0+9)];
	heap32[(r1+1)] = heap32[(r0+10)];
	heap32[(r1+2)] = heap32[(r0+11)];
	heap32[(r1+3)] = heap32[(r0+12)];
	r0 = 1;
	r_g0 = r0;
	return;
}
}