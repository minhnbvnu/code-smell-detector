function _ZN35btSequentialImpulseConstraintSolver29solveGroupCacheFriendlyFinishEPP17btCollisionObjectiPP20btPersistentManifoldiPP17btTypedConstraintiRK19btContactSolverInfoP12btIDebugDrawP12btStackAlloc(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
	var f5;
	var f6;
var __label__ = 0;
	i7 = sp + -504;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(fp+1)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+7)];
	r5 = heap32[(r1+2)];
	r6 = 0;
_1: while(true){
	if(r6 <r5) //_LBB611_1
{
	r7 = (r6 * 34)|0;
	r8 = heap32[(r1+4)];
	r7 = r7 << 2;
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	r8 = heap32[(r7+28)];
	if(r8 !=0) //_LBB611_3
{
	r8 = r8 >> 2;
	heap32[(r8+28)] = heap32[(r7+21)];
	r9 = heapU8[r4+60];
	r9 = r9 & 8;
if(!(r9 ==0)) //_LBB611_5
{
	r9 = heap32[(r7+25)];
	r10 = heap32[(r1+14)];
	r9 = (r9 * 136)|0;
	r9 = (r10 + r9)|0;
	r9 = r9 >> 2;
	heap32[(r8+30)] = heap32[(r9+21)];
	r7 = heap32[(r7+25)];
	r9 = heap32[(r1+14)];
	r7 = (r7 * 136)|0;
	r7 = (r7 + r9)|0;
	r7 = r7 >> 2;
	heap32[(r8+31)] = heap32[(r7+55)];
}
	r6 = (r6 + 1)|0;
continue _1;
}
else{
__label__ = 2;
break _1;
}
}
else{
__label__ = 7;
break _1;
}
}
switch(__label__ ){//multiple entries
case 7:
	r5 = heap32[(r1+7)];
_10: do {
if(!(r5 <1)) //_LBB611_10
{
	r6 = 0;
_12: while(true){
	r7 = (r6 * 34)|0;
	r8 = heap32[(r1+9)];
	r7 = r7 << 2;
	r7 = (r8 + r7)|0;
	r7 = r7 >> 2;
	r8 = heap32[(r7+28)];
	r8 = r8 >> 2;
	f0 = heapFloat[(r8+7)];
	f1 = heapFloat[(r7+21)];
	r6 = (r6 + 1)|0;
	f0 = f1+f0;
	heapFloat[(r8+7)] = f0;
	if(r5 !=r6) //_LBB611_9
{
continue _12;
}
else{
break _10;
}
}
}
} while(0);
	r4 = r4 >> 2;
	r5 = heap32[(r4+11)];
_15: do {
	if(r5 !=0) //_LBB611_13
{
if(!(r3 <1)) //_LBB611_24
{
__label__ = 13; //SET chanka
_17: while(true){
	r5 = r2 >> 2;
	r5 = heap32[(r5)];
	r6 = heapU8[r5+232];
	r6 = r6 & 2;
if(!(r6 ==0)) //_LBB611_18
{
if(!(r5 ==0)) //_LBB611_18
{
	r6 = r5 >> 2;
	f0 = heapFloat[(r6+84)];
	f1 =                         0;
if(!(f0 ==f1)) //_LBB611_18
{
	f0 = heapFloat[(r4+3)];
	f1 = heapFloat[(r6+78)];
	f2 = heapFloat[(r6+128)];
	f3 = heapFloat[(r6+77)];
	f4 = heapFloat[(r6+127)];
	f5 = heapFloat[(r6+76)];
	f6 = heapFloat[(r6+126)];
	f5 = f5+f6;
	f3 = f3+f4;
	heapFloat[(r6+76)] = f5;
	f1 = f1+f2;
	heapFloat[(r6+77)] = f3;
	heapFloat[(r6+78)] = f1;
	heap32[(r6+79)] = 0;
	f1 = heapFloat[(r6+82)];
	f2 = heapFloat[(r6+132)];
	f3 = heapFloat[(r6+81)];
	f4 = heapFloat[(r6+131)];
	f5 = heapFloat[(r6+80)];
	f6 = heapFloat[(r6+130)];
	f5 = f5+f6;
	f3 = f3+f4;
	heapFloat[(r6+80)] = f5;
	f1 = f1+f2;
	heapFloat[(r6+81)] = f3;
	heapFloat[(r6+82)] = f1;
	heap32[(r6+83)] = 0;
	f1 = heapFloat[(r6+142)];
	f2 = heapFloat[(r6+143)];
	f3 = heapFloat[(r6+144)];
	r7 = sp + -64;
	r8 = (r5 + 4)|0;
	r5 = (r5 + 584)|0;
	heap32[(g0)] = r8;
	heapFloat[(g0+1)] = f1;
	heapFloat[(g0+2)] = f2;
	heapFloat[(g0+3)] = f3;
	heap32[(g0+4)] = r5;
	heapFloat[(g0+5)] = f0;
	heap32[(g0+6)] = r7;
	_ZN15btTransformUtil18integrateTransformERK11btTransformRK9btVector3S5_fRS0_(i7);
	r5 = r7 >> 2;
	heap32[(r6+1)] = heap32[(fp+-16)];
	heap32[(r6+2)] = heap32[(r5+1)];
	heap32[(r6+3)] = heap32[(r5+2)];
	heap32[(r6+4)] = heap32[(r5+3)];
	heap32[(r6+5)] = heap32[(r5+4)];
	heap32[(r6+6)] = heap32[(r5+5)];
	heap32[(r6+7)] = heap32[(r5+6)];
	heap32[(r6+8)] = heap32[(r5+7)];
	heap32[(r6+9)] = heap32[(r5+8)];
	heap32[(r6+10)] = heap32[(r5+9)];
	heap32[(r6+11)] = heap32[(r5+10)];
	heap32[(r6+12)] = heap32[(r5+11)];
	heap32[(r6+13)] = heap32[(r5+12)];
	heap32[(r6+14)] = heap32[(r5+13)];
	heap32[(r6+15)] = heap32[(r5+14)];
	heap32[(r6+16)] = heap32[(r5+15)];
}
}
}
	r3 = (r3 + -1)|0;
	r2 = (r2 + 4)|0;
	if(r3 ==0) //_LBB611_24
{
break _15;
}
else{
continue _17;
}
}
}
}
else{
if(!(r3 <1)) //_LBB611_24
{
__label__ = 18; //SET chanka
_25: while(true){
	r4 = r2 >> 2;
	r4 = heap32[(r4)];
	r5 = heapU8[r4+232];
	r5 = r5 & 2;
if(!(r5 ==0)) //_LBB611_23
{
if(!(r4 ==0)) //_LBB611_23
{
	r4 = r4 >> 2;
	f0 = heapFloat[(r4+84)];
	f1 =                         0;
if(!(f0 ==f1)) //_LBB611_23
{
	f0 = heapFloat[(r4+78)];
	f1 = heapFloat[(r4+128)];
	f2 = heapFloat[(r4+77)];
	f3 = heapFloat[(r4+127)];
	f4 = heapFloat[(r4+76)];
	f5 = heapFloat[(r4+126)];
	f4 = f4+f5;
	f2 = f2+f3;
	heapFloat[(r4+76)] = f4;
	f0 = f0+f1;
	heapFloat[(r4+77)] = f2;
	heapFloat[(r4+78)] = f0;
	heap32[(r4+79)] = 0;
	f0 = heapFloat[(r4+82)];
	f1 = heapFloat[(r4+132)];
	f2 = heapFloat[(r4+81)];
	f3 = heapFloat[(r4+131)];
	f4 = heapFloat[(r4+80)];
	f5 = heapFloat[(r4+130)];
	f4 = f4+f5;
	f2 = f2+f3;
	heapFloat[(r4+80)] = f4;
	f0 = f0+f1;
	heapFloat[(r4+81)] = f2;
	heapFloat[(r4+82)] = f0;
	heap32[(r4+83)] = 0;
}
}
}
	r3 = (r3 + -1)|0;
	r2 = (r2 + 4)|0;
	if(r3 !=0) //_LBB611_19
{
continue _25;
}
else{
break _15;
}
}
}
}
} while(0);
	r2 = heap32[(r1+2)];
_33: do {
if(!(r2 >-1)) //_LBB611_33
{
	r3 = heap32[(r1+3)];
if(!(r3 >-1)) //_LBB611_31
{
	r3 = heap32[(r1+4)];
if(!(r3 ==0)) //_LBB611_30
{
	r4 = heapU8[r0+20];
if(!(r4 ==0)) //_LBB611_29
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r1+4)] = 0;
}
	r3 = 1;
	heap8[r0+20] = r3;
	heap32[(r1+4)] = 0;
	heap32[(r1+3)] = 0;
}
	r3 = (r2 * 136)|0;
_44: while(true){
	r4 = heap32[(r1+4)];
	r4 = (r4 + r3)|0;
	r5 = sp + -472;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 136;
	r2 = (r2 + 1)|0;
	r3 = (r3 + 136)|0;
	memcpy(i7);
	if(r2 !=0) //_LBB611_32
{
continue _44;
}
else{
break _33;
}
}
}
} while(0);
	heap32[(r1+2)] = 0;
	r2 = heap32[(r1+7)];
_47: do {
if(!(r2 >-1)) //_LBB611_42
{
	r3 = heap32[(r1+8)];
if(!(r3 >-1)) //_LBB611_40
{
	r3 = heap32[(r1+9)];
if(!(r3 ==0)) //_LBB611_39
{
	r4 = heapU8[r0+40];
if(!(r4 ==0)) //_LBB611_38
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r1+9)] = 0;
}
	r3 = 1;
	heap8[r0+40] = r3;
	heap32[(r1+9)] = 0;
	heap32[(r1+8)] = 0;
}
	r3 = (r2 * 136)|0;
_58: while(true){
	r4 = heap32[(r1+9)];
	r4 = (r4 + r3)|0;
	r5 = sp + -336;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 136;
	r2 = (r2 + 1)|0;
	r3 = (r3 + 136)|0;
	memcpy(i7);
	if(r2 !=0) //_LBB611_41
{
continue _58;
}
else{
break _47;
}
}
}
} while(0);
	heap32[(r1+7)] = 0;
	r2 = heap32[(r1+12)];
_61: do {
if(!(r2 >-1)) //_LBB611_51
{
	r3 = heap32[(r1+13)];
if(!(r3 >-1)) //_LBB611_49
{
	r3 = heap32[(r1+14)];
if(!(r3 ==0)) //_LBB611_48
{
	r4 = heapU8[r0+60];
if(!(r4 ==0)) //_LBB611_47
{
	r4 = gNumAlignedFree;
	r4 = r4 >> 2;
	r5 = heap32[(r4)];
	r5 = (r5 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r4)] = r5;
	r3 = heap32[(r3+-1)];
	heap32[(g0)] = r3;
	free(i7);
}
	heap32[(r1+14)] = 0;
}
	r3 = 1;
	heap8[r0+60] = r3;
	heap32[(r1+14)] = 0;
	heap32[(r1+13)] = 0;
}
	r0 = (r2 * 136)|0;
_72: while(true){
	r3 = heap32[(r1+14)];
	r3 = (r3 + r0)|0;
	r4 = sp + -200;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = 136;
	r2 = (r2 + 1)|0;
	r0 = (r0 + 136)|0;
	memcpy(i7);
	if(r2 !=0) //_LBB611_50
{
continue _72;
}
else{
break _61;
}
}
}
} while(0);
	heap32[(r1+12)] = 0;
	f0 =                         0;
	f_g0 = f0;
	return;
break;
case 2:
	r0 = _2E_str955;
	r1 = _2E_str652;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	heap32[(g0+2)] = 1129;
	_assert(i7);
break;
}
}