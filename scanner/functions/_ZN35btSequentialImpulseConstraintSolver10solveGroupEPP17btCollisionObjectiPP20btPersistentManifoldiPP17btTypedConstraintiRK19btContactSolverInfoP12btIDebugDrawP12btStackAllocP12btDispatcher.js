function _ZN35btSequentialImpulseConstraintSolver10solveGroupEPP17btCollisionObjectiPP20btPersistentManifoldiPP17btTypedConstraintiRK19btContactSolverInfoP12btIDebugDrawP12btStackAllocP12btDispatcher(sp)
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
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = _2E_str450;
	r1 = heap32[(fp+1)];
	heap32[(g0)] = r0;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	if(r1 !=0) //_LBB610_2
{
	r0 = heap32[(fp+2)];
	if(r0 !=0) //_LBB610_4
{
	r2 = heap32[(fp)];
	r3 = heap32[(fp+3)];
	r4 = heap32[(fp+4)];
	r5 = heap32[(fp+5)];
	r6 = heap32[(fp+6)];
	r7 = heap32[(fp+7)];
	r8 = heap32[(fp+8)];
	r9 = heap32[(fp+9)];
	r10 = r2 >> 2;
	r11 = heap32[(r10)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+8)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r5;
	heap32[(g0+6)] = r6;
	heap32[(g0+7)] = r7;
	heap32[(g0+8)] = r8;
	heap32[(g0+9)] = r9;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r11 = heap32[(r10)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+9)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r5;
	heap32[(g0+6)] = r6;
	heap32[(g0+7)] = r7;
	heap32[(g0+8)] = r8;
	heap32[(g0+9)] = r9;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+7)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r4;
	heap32[(g0+5)] = r5;
	heap32[(g0+6)] = r6;
	heap32[(g0+7)] = r7;
	heap32[(g0+8)] = r8;
	heap32[(g0+9)] = r9;
	r0 = _ZN15CProfileManager11CurrentNodeE;
	r0 = r0 >> 2;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_5: do {
if(!(r3 !=0)) //_LBB610_10
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB610_7
{
	r1 = sp + -8;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 0;
	r3 = _ZL13gProfileClock_2E_0;
	gettimeofday(i7);
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r3 = r3 >> 2;
	r1 = r1 >> 2;
	r4 = heap32[(fp+-2)];
	r5 = heap32[(r3)];
	r4 = (r4 - r5)|0;
	r1 = heap32[(r1+1)];
	r3 = heap32[(r3+1)];
	r1 = (r1 - r3)|0;
	r3 = (r4 * 1000000)|0;
	r1 = (r1 + r3)|0;
	r3 = heap32[(r2+3)];
	r1 = (r1 - r3)|0;
	f0 = uint(r1); //fuitos r1, f0
	f1 =                      1000;
	f2 = heapFloat[(r2+2)];
	f0 = f0/f1;
	f0 = f2+f0;
	heapFloat[(r2+2)] = f0;
	r1 = heap32[(r2+4)];
	if(r1 !=0) //_LBB610_10
{
break _5;
}
else{
	r1 = heap32[(r0)];
}
}
	r1 = r1 >> 2;
	r1 = heap32[(r1+5)];
	heap32[(r0)] = r1;
}
} while(0);
	f0 =                         0;
	f_g0 = f0;
	return;
}
else{
	r0 = _2E_str753;
	r1 = _2E_str652;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 1186;
	_assert(i7);
}
}
else{
	r1 = _2E_str551;
	r0 = _2E_str652;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = 1185;
	_assert(i7);
}
}