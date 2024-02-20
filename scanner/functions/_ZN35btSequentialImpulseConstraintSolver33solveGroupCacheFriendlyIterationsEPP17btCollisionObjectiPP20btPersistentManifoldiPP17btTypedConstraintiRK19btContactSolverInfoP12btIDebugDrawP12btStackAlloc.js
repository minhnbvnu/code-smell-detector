function _ZN35btSequentialImpulseConstraintSolver33solveGroupCacheFriendlyIterationsEPP17btCollisionObjectiPP20btPersistentManifoldiPP17btTypedConstraintiRK19btContactSolverInfoP12btIDebugDrawP12btStackAlloc(sp)
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
	var r12;
	var r13;
	var r14;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -48;var g0 = i7>>2; // save stack
	r0 = _2E_str854;
	r1 = heap32[(fp+7)];
	heap32[(g0)] = r0;
	r0 = heap32[(fp)];
	r2 = heap32[(fp+5)];
	r3 = heap32[(fp+6)];
	r4 = r1 >> 2;
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r5 = heap32[(r4+5)];
if(!(r5 <1)) //_LBB613_64
{
	r5 = 0;
_3: while(true){
	r6 = r0 >> 2;
	r7 = heap32[(r4+15)];
	r8 = r7 & 1;
	if(r8 != 0) //_LBB613_4
{
	r8 = r5 & 7;
if(!(r8 !=0)) //_LBB613_3
{
	r7 = heap32[(r6+2)];
	r8 = heap32[(r6+12)];
if(!(r7 <1)) //_LBB613_19
{
	r9 = 0;
	r7 = (r9 - r7)|0;
	r9 = 1;
_10: while(true){
	r10 = heap32[(r6+19)];
	r11 = r9 << 2;
	r11 = (r10 + r11)|0;
	r11 = r11 >> 2;
	r12 = heap32[(r6+31)];
	r13 = heap32[(r11+-1)];
	r12 = (r12 * 1664525)|0;
	r12 = (r12 + 1013904223)|0;
	heap32[(r6+31)] = r12;
	if(uint(r9) <uint(65537)) //_LBB613_9
{
	r14 = r12 >>> 16;
	r12 = r14 ^ r12;
	if(uint(r9) <uint(257)) //_LBB613_11
{
	r14 = r12 >>> 8;
	r12 = r14 ^ r12;
	if(uint(r9) <uint(17)) //_LBB613_13
{
	r14 = r12 >>> 4;
	r12 = r14 ^ r12;
	if(uint(r9) <uint(5)) //_LBB613_15
{
	r14 = r12 >>> 2;
	r12 = r14 ^ r12;
	if(uint(r9) <uint(3)) //_LBB613_17
{
	r14 = r12 >>> 1;
	r12 = r14 ^ r12;
}
}
}
}
}
	r12 = Math.floor(uint(r12) % uint(r9));
	r12 = r12 << 2;
	r10 = (r10 + r12)|0;
	r10 = r10 >> 2;
	r10 = heap32[(r10)];
	heap32[(r11+-1)] = r10;
	r10 = heap32[(r6+19)];
	r10 = (r10 + r12)|0;
	r9 = (r9 + 1)|0;
	r10 = r10 >> 2;
	heap32[(r10)] = r13;
	r10 = (r7 + r9)|0;
if(!(r10 !=1)) //_LBB613_7
{
break _10;
}
}
}
_20: do {
if(!(r8 <1)) //_LBB613_33
{
	r7 = 0;
	r7 = (r7 - r8)|0;
	r8 = 1;
_22: while(true){
	r9 = heap32[(r6+24)];
	r10 = r8 << 2;
	r10 = (r9 + r10)|0;
	r10 = r10 >> 2;
	r11 = heap32[(r6+31)];
	r12 = heap32[(r10+-1)];
	r11 = (r11 * 1664525)|0;
	r11 = (r11 + 1013904223)|0;
	heap32[(r6+31)] = r11;
	if(uint(r8) <uint(65537)) //_LBB613_23
{
	r13 = r11 >>> 16;
	r11 = r13 ^ r11;
	if(uint(r8) <uint(257)) //_LBB613_25
{
	r13 = r11 >>> 8;
	r11 = r13 ^ r11;
	if(uint(r8) <uint(17)) //_LBB613_27
{
	r13 = r11 >>> 4;
	r11 = r13 ^ r11;
	if(uint(r8) <uint(5)) //_LBB613_29
{
	r13 = r11 >>> 2;
	r11 = r13 ^ r11;
	if(uint(r8) <uint(3)) //_LBB613_31
{
	r13 = r11 >>> 1;
	r11 = r13 ^ r11;
}
}
}
}
}
	r11 = Math.floor(uint(r11) % uint(r8));
	r11 = r11 << 2;
	r9 = (r9 + r11)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	heap32[(r10+-1)] = r9;
	r9 = heap32[(r6+24)];
	r9 = (r9 + r11)|0;
	r8 = (r8 + 1)|0;
	r9 = r9 >> 2;
	heap32[(r9)] = r12;
	r9 = (r7 + r8)|0;
if(!(r9 !=1)) //_LBB613_21
{
break _20;
}
}
}
} while(0);
	r7 = heap32[(r4+15)];
}
}
	r8 = heap32[(r6+7)];
	r7 = r7 & 256;
_33: do {
	if(r7 !=0) //_LBB613_37
{
_35: do {
if(!(r8 <1)) //_LBB613_40
{
	r7 = 0;
	r8 = r7;
_37: while(true){
	r9 = (r8 * 34)|0;
	r10 = heap32[(r6+9)];
	r9 = r9 << 2;
	r9 = (r10 + r9)|0;
	r9 = r9 >> 2;
	r11 = heap32[(r9+27)];
	r9 = heap32[(r9+26)];
	r10 = (r10 + r7)|0;
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r10;
	r8 = (r8 + 1)|0;
	r7 = (r7 + 136)|0;
	_ZN35btSequentialImpulseConstraintSolver33resolveSingleConstraintRowGenericER11btRigidBodyS1_RK18btSolverConstraint(i7);
	r9 = heap32[(r6+7)];
if(!(r9 >r8)) //_LBB613_39
{
break _35;
}
}
}
} while(0);
_40: do {
if(!(r3 <1)) //_LBB613_43
{
	r7 = r2;
	r8 = r3;
_42: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = r9 >> 2;
	r11 = heap32[(r10)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+6)];
	f0 = heapFloat[(r4+3)];
	r12 = heap32[(r10+6)];
	r10 = heap32[(r10+5)];
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r12;
	heapFloat[(g0+3)] = f0;
	r8 = (r8 + -1)|0;
	r7 = (r7 + 4)|0;
	__FUNCTION_TABLE__[(r11)>>2](i7);
if(!(r8 !=0)) //_LBB613_42
{
break _40;
}
}
}
} while(0);
	r7 = heap32[(r6+2)];
_45: do {
if(!(r7 <1)) //_LBB613_46
{
	r8 = 0;
_47: while(true){
	r9 = heap32[(r6+19)];
	r10 = r8 << 2;
	r9 = (r9 + r10)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r9 = (r9 * 136)|0;
	r10 = heap32[(r6+4)];
	r9 = (r10 + r9)|0;
	r10 = r9 >> 2;
	r11 = heap32[(r10+27)];
	r10 = heap32[(r10+26)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r9;
	r8 = (r8 + 1)|0;
	_ZN35btSequentialImpulseConstraintSolver36resolveSingleConstraintRowLowerLimitER11btRigidBodyS1_RK18btSolverConstraint(i7);
if(!(r7 !=r8)) //_LBB613_45
{
break _45;
}
}
}
} while(0);
	r7 = heap32[(r6+12)];
	if(r7 <1) //_LBB613_63
{
break _33;
}
else{
	r8 = 0;
_51: while(true){
	r9 = heap32[(r6+24)];
	r10 = r8 << 2;
	r9 = (r9 + r10)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r10 = heap32[(r6+14)];
	r9 = (r9 * 136)|0;
	r9 = (r10 + r9)|0;
	r10 = r9 >> 2;
	r11 = heap32[(r10+25)];
	r12 = heap32[(r6+4)];
	r11 = (r11 * 136)|0;
	r11 = (r12 + r11)|0;
	r11 = r11 >> 2;
	f0 = heapFloat[(r11+21)];
	f1 =                         0;
if(!(f0 <=f1)) //_LBB613_50
{
	f1 = heapFloat[(r10+22)];
	f0 = f1*f0;
	f1 = -f0;
	heapFloat[(r10+31)] = f1;
	heapFloat[(r10+32)] = f0;
	r11 = heap32[(r10+27)];
	r10 = heap32[(r10+26)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r9;
	_ZN35btSequentialImpulseConstraintSolver33resolveSingleConstraintRowGenericER11btRigidBodyS1_RK18btSolverConstraint(i7);
}
	r8 = (r8 + 1)|0;
	if(r7 ==r8) //_LBB613_63
{
break _33;
}
else{
continue _51;
}
}
}
}
else{
_57: do {
if(!(r8 <1)) //_LBB613_52
{
	r8 = 0;
	r7 = r8;
_59: while(true){
	r9 = (r7 * 34)|0;
	r10 = heap32[(r6+9)];
	r9 = r9 << 2;
	r9 = (r10 + r9)|0;
	r9 = r9 >> 2;
	r11 = heap32[(r9+27)];
	r9 = heap32[(r9+26)];
	r10 = (r10 + r8)|0;
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r10;
	r7 = (r7 + 1)|0;
	r8 = (r8 + 136)|0;
	_ZN35btSequentialImpulseConstraintSolver33resolveSingleConstraintRowGenericER11btRigidBodyS1_RK18btSolverConstraint(i7);
	r9 = heap32[(r6+7)];
if(!(r9 >r7)) //_LBB613_51
{
break _57;
}
}
}
} while(0);
_62: do {
if(!(r3 <1)) //_LBB613_55
{
	r7 = r2;
	r8 = r3;
_64: while(true){
	r9 = r7 >> 2;
	r9 = heap32[(r9)];
	r10 = r9 >> 2;
	r11 = heap32[(r10)];
	r11 = r11 >> 2;
	r11 = heap32[(r11+6)];
	f0 = heapFloat[(r4+3)];
	r12 = heap32[(r10+6)];
	r10 = heap32[(r10+5)];
	heap32[(g0)] = r9;
	heap32[(g0+1)] = r10;
	heap32[(g0+2)] = r12;
	heapFloat[(g0+3)] = f0;
	r8 = (r8 + -1)|0;
	r7 = (r7 + 4)|0;
	__FUNCTION_TABLE__[(r11)>>2](i7);
if(!(r8 !=0)) //_LBB613_54
{
break _62;
}
}
}
} while(0);
	r7 = heap32[(r6+2)];
_67: do {
if(!(r7 <1)) //_LBB613_58
{
	r8 = 0;
_69: while(true){
	r9 = heap32[(r6+19)];
	r10 = r8 << 2;
	r9 = (r9 + r10)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r9 = (r9 * 136)|0;
	r10 = heap32[(r6+4)];
	r9 = (r10 + r9)|0;
	r10 = r9 >> 2;
	r11 = heap32[(r10+27)];
	r10 = heap32[(r10+26)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r9;
	r8 = (r8 + 1)|0;
	_ZN35btSequentialImpulseConstraintSolver36resolveSingleConstraintRowLowerLimitER11btRigidBodyS1_RK18btSolverConstraint(i7);
if(!(r7 !=r8)) //_LBB613_57
{
break _67;
}
}
}
} while(0);
	r7 = heap32[(r6+12)];
if(!(r7 <1)) //_LBB613_63
{
	r8 = 0;
_73: while(true){
	r9 = heap32[(r6+24)];
	r10 = r8 << 2;
	r9 = (r9 + r10)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r10 = heap32[(r6+14)];
	r9 = (r9 * 136)|0;
	r9 = (r10 + r9)|0;
	r10 = r9 >> 2;
	r11 = heap32[(r10+25)];
	r12 = heap32[(r6+4)];
	r11 = (r11 * 136)|0;
	r11 = (r12 + r11)|0;
	r11 = r11 >> 2;
	f0 = heapFloat[(r11+21)];
	f1 =                         0;
if(!(f0 <=f1)) //_LBB613_62
{
	f1 = heapFloat[(r10+22)];
	f0 = f1*f0;
	f1 = -f0;
	heapFloat[(r10+31)] = f1;
	heapFloat[(r10+32)] = f0;
	r11 = heap32[(r10+27)];
	r10 = heap32[(r10+26)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r11;
	heap32[(g0+2)] = r9;
	_ZN35btSequentialImpulseConstraintSolver33resolveSingleConstraintRowGenericER11btRigidBodyS1_RK18btSolverConstraint(i7);
}
	r8 = (r8 + 1)|0;
if(!(r7 !=r8)) //_LBB613_60
{
break _33;
}
}
}
}
} while(0);
	r5 = (r5 + 1)|0;
	r6 = heap32[(r4+5)];
	if(r6 >r5) //_LBB613_2
{
continue _3;
}
else{
break _3;
}
}
}
	r4 = heap32[(fp+1)];
	r5 = heap32[(fp+2)];
	r6 = heap32[(fp+3)];
	r7 = heap32[(fp+4)];
	r8 = heap32[(fp+8)];
	r9 = heap32[(fp+9)];
	r10 = r0 >> 2;
	r10 = heap32[(r10)];
	r10 = r10 >> 2;
	r10 = heap32[(r10+6)];
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r5;
	heap32[(g0+3)] = r6;
	heap32[(g0+4)] = r7;
	heap32[(g0+5)] = r2;
	heap32[(g0+6)] = r3;
	heap32[(g0+7)] = r1;
	heap32[(g0+8)] = r8;
	heap32[(g0+9)] = r9;
	r0 = _ZN15CProfileManager11CurrentNodeE;
	__FUNCTION_TABLE__[(r10)>>2](i7);
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_80: do {
if(!(r3 !=0)) //_LBB613_70
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB613_67
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
	if(r1 !=0) //_LBB613_70
{
break _80;
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