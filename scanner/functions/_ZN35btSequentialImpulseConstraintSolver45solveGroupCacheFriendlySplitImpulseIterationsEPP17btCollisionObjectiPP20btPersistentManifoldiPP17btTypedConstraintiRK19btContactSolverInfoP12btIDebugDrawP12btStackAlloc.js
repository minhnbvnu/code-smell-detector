function _ZN35btSequentialImpulseConstraintSolver45solveGroupCacheFriendlySplitImpulseIterationsEPP17btCollisionObjectiPP20btPersistentManifoldiPP17btTypedConstraintiRK19btContactSolverInfoP12btIDebugDrawP12btStackAlloc(sp)
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
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+7)];
	r1 = r0 >> 2;
	r2 = heap32[(r1+11)];
_1: do {
if(!(r2 ==0)) //_LBB607_14
{
	r2 = heap32[(fp)];
	r0 = heapU8[r0+61];
	r3 = heap32[(r1+5)];
	r0 = r0 & 1;
	if(r0 != 0) //_LBB607_3
{
if(!(r3 <1)) //_LBB607_14
{
	r0 = 0;
_6: while(true){
	r3 = r2 >> 2;
	r4 = heap32[(r3+2)];
if(!(r4 <1)) //_LBB607_8
{
	r5 = 0;
_10: while(true){
	r6 = heap32[(r3+19)];
	r7 = r5 << 2;
	r6 = (r6 + r7)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	r6 = (r6 * 136)|0;
	r7 = heap32[(r3+4)];
	r6 = (r7 + r6)|0;
	r7 = r6 >> 2;
	r8 = heap32[(r7+27)];
	r7 = heap32[(r7+26)];
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r6;
	r5 = (r5 + 1)|0;
	_ZN35btSequentialImpulseConstraintSolver43resolveSplitPenetrationImpulseCacheFriendlyER11btRigidBodyS1_RK18btSolverConstraint(i7);
if(!(r4 !=r5)) //_LBB607_7
{
break _10;
}
}
}
	r0 = (r0 + 1)|0;
	r3 = heap32[(r1+5)];
	if(r3 >r0) //_LBB607_5
{
continue _6;
}
else{
break _1;
}
}
}
}
else{
	if(r3 >0) //_LBB607_9
{
	r0 = 0;
_15: while(true){
	r3 = r2 >> 2;
	r4 = heap32[(r3+2)];
if(!(r4 <1)) //_LBB607_13
{
	r5 = 0;
_19: while(true){
	r6 = heap32[(r3+19)];
	r7 = r5 << 2;
	r6 = (r6 + r7)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	r6 = (r6 * 136)|0;
	r7 = heap32[(r3+4)];
	r6 = (r7 + r6)|0;
	r7 = r6 >> 2;
	r8 = heap32[(r7+27)];
	r7 = heap32[(r7+26)];
	heap32[(g0)] = r7;
	heap32[(g0+1)] = r8;
	heap32[(g0+2)] = r6;
	r5 = (r5 + 1)|0;
	_ZN35btSequentialImpulseConstraintSolver43resolveSplitPenetrationImpulseCacheFriendlyER11btRigidBodyS1_RK18btSolverConstraint(i7);
if(!(r4 !=r5)) //_LBB607_12
{
break _19;
}
}
}
	r0 = (r0 + 1)|0;
	r3 = heap32[(r1+5)];
	if(r3 >r0) //_LBB607_10
{
continue _15;
}
else{
break _1;
}
}
}
}
}
} while(0);
	return;
}