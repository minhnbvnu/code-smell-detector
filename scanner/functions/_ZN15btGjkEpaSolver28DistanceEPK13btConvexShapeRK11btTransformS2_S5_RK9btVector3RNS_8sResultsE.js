function _ZN15btGjkEpaSolver28DistanceEPK13btConvexShapeRK11btTransformS2_S5_RK9btVector3RNS_8sResultsE(sp)
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
	var f3;
	var f4;
	var f5;
	var f6;
	var f7;
	var f8;
	var f9;
	var f10;
	var f11;
	var f12;
	var f13;
	var f14;
	var f15;
	var f16;
	var f17;
	var f18;
var __label__ = 0;
	i7 = sp + -592;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp+5)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+2)];
	r4 = heap32[(fp+3)];
	r5 = sp + -176;
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r0;
	heap32[(g0+2)] = r3;
	heap32[(g0+3)] = r4;
	heap32[(g0+4)] = r1;
	heap32[(g0+5)] = r5;
	heap32[(g0+6)] = 0;
	r2 = sp + -560;
	r3 = r2 >> 2;
	_ZN12gjkepa2_implL10InitializeEPK13btConvexShapeRK11btTransformS2_S5_RN15btGjkEpaSolver28sResultsERNS_13MinkowskiDiffEb(i7);
	heap32[(r3+32)] = 0;
	heap32[(r3+33)] = 0;
	heap32[(r3+34)] = 0;
	heap32[(r3+35)] = 0;
	heap32[(r3+91)] = 0;
	heap32[(r3+94)] = 2;
	heap32[(r3+92)] = 0;
	heap32[(r3+36)] = 0;
	r4 = heap32[(fp+4)];
	heap32[(g0)] = r2;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r4;
	_ZN12gjkepa2_impl3GJK8EvaluateERKNS_13MinkowskiDiffERK9btVector3(i7);
	r2 = r_g0;
	if(r2 ==0) //_LBB550_3
{
	r2 = heap32[(r3+93)];
	r4 = r2 >> 2;
	r4 = heap32[(r4+8)];
_3: do {
	if(r4 !=0) //_LBB550_5
{
	r4 = 0;
	f0 =                         0;
	f1 = f0;
	f2 = f0;
	f3 = f0;
	f4 = f0;
	f5 = f0;
_5: while(true){
	r6 = r4 << 2;
	r2 = (r2 + r6)|0;
	r2 = r2 >> 2;
	r7 = r5 >> 2;
	r8 = heap32[(r7+30)];
	r4 = (r4 + 1)|0;
	f6 = heapFloat[(r2+4)];
	r2 = heap32[(r2)];
	r9 = heap32[(fp+-44)];
	r10 = heap32[(r7+31)];
	r11 = r8 & 1;
	if(r11 != 0) //_LBB550_8
{
	r11 = (r9 + r10)|0;
	r11 = r11 >> 2;
	r11 = heap32[(r11)];
	r8 = (r8 + r11)|0;
	r8 = (r8 + -1)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
}
	r11 = sp + -48;
	r9 = (r9 + r10)|0;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r9;
	heap32[(g0+2)] = r2;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r2 = heap32[(r3+93)];
	r2 = (r2 + r6)|0;
	r2 = r2 >> 2;
	r6 = r11 >> 2;
	r2 = heap32[(r2)];
	r2 = r2 >> 2;
	f7 = heapFloat[(fp+-12)];
	f8 = heapFloat[(r6+1)];
	f9 = heapFloat[(r6+2)];
	f10 = heapFloat[(r2+2)];
	f11 = heapFloat[(r2+1)];
	f12 = heapFloat[(r2)];
	f7 = f7*f6;
	f8 = f8*f6;
	f9 = f9*f6;
	r2 = heap32[(r7+30)];
	f5 = f5+f7;
	f4 = f4+f8;
	f3 = f3+f9;
	f7 = -f10;
	f8 = -f11;
	f9 = -f12;
	r6 = heap32[(r7+1)];
	r8 = heap32[(r7+31)];
	r9 = r2 & 1;
	if(r9 != 0) //_LBB550_11
{
	r9 = (r6 + r8)|0;
	r9 = r9 >> 2;
	r9 = heap32[(r9)];
	r2 = (r2 + r9)|0;
	r2 = (r2 + -1)|0;
	r2 = r2 >> 2;
	r2 = heap32[(r2)];
}
	f10 = heapFloat[(r7+2)];
	f11 = heapFloat[(r7+3)];
	f12 = heapFloat[(r7+6)];
	f13 = heapFloat[(r7+7)];
	f10 = f10*f9;
	f11 = f11*f8;
	f14 = heapFloat[(r7+4)];
	f15 = heapFloat[(r7+10)];
	f16 = heapFloat[(r7+11)];
	f17 = heapFloat[(r7+12)];
	f18 = heapFloat[(r7+8)];
	f12 = f12*f9;
	f13 = f13*f8;
	f10 = f10+f11;
	f11 = f14*f7;
	r9 = sp + -16;
	f9 = f15*f9;
	f8 = f16*f8;
	f12 = f12+f13;
	f13 = f18*f7;
	f10 = f10+f11;
	r10 = r9 >> 2;
	f8 = f9+f8;
	f7 = f17*f7;
	f9 = f12+f13;
	heapFloat[(fp+-4)] = f10;
	f7 = f8+f7;
	heapFloat[(r10+1)] = f9;
	heapFloat[(r10+2)] = f7;
	heap32[(r10+3)] = 0;
	r10 = sp + -32;
	r6 = (r6 + r8)|0;
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = r9;
	__FUNCTION_TABLE__[(r2)>>2](i7);
	r2 = r10 >> 2;
	f7 = heapFloat[(r7+14)];
	f8 = heapFloat[(fp+-8)];
	f9 = heapFloat[(r7+18)];
	f10 = heapFloat[(r7+22)];
	f11 = heapFloat[(r7+15)];
	f12 = heapFloat[(r2+1)];
	f13 = heapFloat[(r7+19)];
	f14 = heapFloat[(r7+23)];
	f7 = f7*f8;
	f11 = f11*f12;
	f15 = heapFloat[(r7+16)];
	f16 = heapFloat[(r2+2)];
	f17 = heapFloat[(r7+20)];
	f18 = heapFloat[(r7+24)];
	f9 = f9*f8;
	f13 = f13*f12;
	f8 = f10*f8;
	f10 = f14*f12;
	f7 = f7+f11;
	f11 = f15*f16;
	f9 = f9+f13;
	f12 = f17*f16;
	f8 = f8+f10;
	f10 = f18*f16;
	f7 = f7+f11;
	f11 = heapFloat[(r7+26)];
	f9 = f9+f12;
	f12 = heapFloat[(r7+27)];
	f8 = f8+f10;
	f10 = heapFloat[(r7+28)];
	f7 = f7+f11;
	f9 = f9+f12;
	f8 = f8+f10;
	f7 = f7*f6;
	f9 = f9*f6;
	f6 = f8*f6;
	r2 = heap32[(r3+93)];
	f2 = f2+f7;
	f1 = f1+f9;
	f0 = f0+f6;
	r6 = r2 >> 2;
	r6 = heap32[(r6+8)];
if(!(uint(r6) >uint(r4))) //_LBB550_6
{
break _3;
}
}
}
else{
	f0 =                         0;
	f1 = f0;
	f2 = f0;
	f3 = f0;
	f4 = f0;
	f5 = f0;
}
} while(0);
	r0 = r0 >> 2;
	f6 = heapFloat[(r0)];
	f7 = heapFloat[(r0+1)];
	f8 = heapFloat[(r0+4)];
	f9 = heapFloat[(r0+5)];
	f6 = f6*f5;
	f7 = f7*f4;
	f10 = heapFloat[(r0+2)];
	f11 = heapFloat[(r0+8)];
	f12 = heapFloat[(r0+9)];
	f13 = heapFloat[(r0+6)];
	f8 = f8*f5;
	f9 = f9*f4;
	f6 = f6+f7;
	f7 = f10*f3;
	f10 = heapFloat[(r0+10)];
	f11 = f11*f5;
	f12 = f12*f4;
	f8 = f8+f9;
	f9 = f13*f3;
	f6 = f6+f7;
	f7 = heapFloat[(r0+12)];
	f13 = heapFloat[(r0+14)];
	f14 = heapFloat[(r0+13)];
	f8 = f8+f9;
	r1 = r1 >> 2;
	f9 = f11+f12;
	f10 = f10*f3;
	f6 = f6+f7;
	f7 = f9+f10;
	f8 = f8+f14;
	heapFloat[(r1+1)] = f6;
	f6 = f7+f13;
	heapFloat[(r1+2)] = f8;
	heapFloat[(r1+3)] = f6;
	heap32[(r1+4)] = 0;
	f6 = heapFloat[(r0)];
	f7 = heapFloat[(r0+1)];
	f8 = heapFloat[(r0+4)];
	f9 = heapFloat[(r0+5)];
	f10 = heapFloat[(r0+2)];
	f6 = f6*f2;
	f7 = f7*f1;
	f11 = heapFloat[(r0+8)];
	f12 = heapFloat[(r0+9)];
	f13 = heapFloat[(r0+6)];
	f8 = f8*f2;
	f9 = f9*f1;
	f6 = f6+f7;
	f7 = f10*f0;
	f10 = heapFloat[(r0+10)];
	f11 = f11*f2;
	f12 = f12*f1;
	f8 = f8+f9;
	f9 = f13*f0;
	f6 = f6+f7;
	f7 = heapFloat[(r0+12)];
	f13 = heapFloat[(r0+14)];
	f14 = heapFloat[(r0+13)];
	f8 = f8+f9;
	f9 = f11+f12;
	f10 = f10*f0;
	f6 = f6+f7;
	f7 = f9+f10;
	f8 = f8+f14;
	heapFloat[(r1+5)] = f6;
	f6 = f7+f13;
	heapFloat[(r1+6)] = f8;
	heapFloat[(r1+7)] = f6;
	f2 = f5-f2;
	heap32[(r1+8)] = 0;
	f1 = f4-f1;
	heapFloat[(r1+9)] = f2;
	f0 = f3-f0;
	heapFloat[(r1+10)] = f1;
	heapFloat[(r1+11)] = f0;
	f2 = f2*f2;
	f1 = f1*f1;
	heap32[(r1+12)] = 0;
	f1 = f2+f1;
	f0 = f0*f0;
	f0 = f1+f0;
	heapFloat[(g0)] = f0;
	sqrtf(i7);
	f1 =                         1;
	f2 =   9.9999997473787516e-005;
	f2 = f_g0 > f2 ? f_g0 : f1;
	heapFloat[(r1+13)] = f_g0;
	f0 = f1/f2;
	f1 = heapFloat[(r1+9)];
	f1 = f1*f0;
	heapFloat[(r1+9)] = f1;
	f1 = heapFloat[(r1+10)];
	f1 = f1*f0;
	heapFloat[(r1+10)] = f1;
	f1 = heapFloat[(r1+11)];
	f0 = f1*f0;
	heapFloat[(r1+11)] = f0;
	r0 = 1;
	r_g0 = r0;
	return;
}
else{
	if(r2 !=1) //_LBB550_14
{
	r0 = 2;
}
else{
	r0 = 1;
}
	r1 = r1 >> 2;
	heap32[(r1)] = r0;
	r0 = 0;
	r_g0 = r0;
	return;
}
}