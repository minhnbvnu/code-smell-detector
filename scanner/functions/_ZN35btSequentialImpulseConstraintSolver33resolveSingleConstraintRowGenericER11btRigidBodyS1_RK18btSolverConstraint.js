function _ZN35btSequentialImpulseConstraintSolver33resolveSingleConstraintRowGenericER11btRigidBodyS1_RK18btSolverConstraint(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
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
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = heap32[(fp+2)];
	r1 = r1 >> 2;
	r0 = r0 >> 2;
	r2 = heap32[(fp+1)];
	r2 = r2 >> 2;
	f0 = heapFloat[(r1+4)];
	f1 = heapFloat[(r0+126)];
	f2 = heapFloat[(r1+5)];
	f3 = heapFloat[(r0+127)];
	f4 = heapFloat[(r1)];
	f5 = heapFloat[(r0+130)];
	f6 = heapFloat[(r1+1)];
	f7 = heapFloat[(r0+131)];
	f8 = heapFloat[(r2+126)];
	f9 = heapFloat[(r2+127)];
	f10 = heapFloat[(r1+6)];
	f11 = heapFloat[(r0+128)];
	f1 = f0*f1;
	f3 = f2*f3;
	f4 = f4*f5;
	f5 = f6*f7;
	f6 = heapFloat[(r1+2)];
	f7 = heapFloat[(r0+132)];
	f12 = heapFloat[(r1+8)];
	f13 = heapFloat[(r2+130)];
	f14 = heapFloat[(r1+9)];
	f15 = heapFloat[(r2+131)];
	f16 = heapFloat[(r2+128)];
	f1 = f1+f3;
	f3 = f10*f11;
	f4 = f4+f5;
	f5 = f6*f7;
	f6 = f12*f13;
	f7 = f14*f15;
	f11 = heapFloat[(r1+10)];
	f12 = heapFloat[(r2+132)];
	f8 = f0*f8;
	f9 = f2*f9;
	f13 = heapFloat[(r1+21)];
	f14 = heapFloat[(r1+30)];
	f1 = f1+f3;
	f3 = f4+f5;
	f4 = f6+f7;
	f5 = f11*f12;
	f6 = f8+f9;
	f7 = f10*f16;
	f8 = heapFloat[(r1+29)];
	f9 = f13*f14;
	f1 = f1+f3;
	f3 = heapFloat[(r1+23)];
	f4 = f4+f5;
	f5 = f6+f7;
	f4 = f4-f5;
	f5 = f8-f9;
	f1 = f3*f1;
	f1 = f5-f1;
	f3 = f3*f4;
	f1 = f1-f3;
	f3 = heapFloat[(r1+31)];
	f4 = f13+f1;
	if(f3 <=f4) //_LBB602_2
{
	f3 = heapFloat[(r1+32)];
	if(f3 >=f4) //_LBB602_4
{
	heapFloat[(r1+21)] = f4;
}
else{
	f1 = f3-f13;
	heapFloat[(r1+21)] = f3;
}
}
else{
	f1 = f3-f13;
	heapFloat[(r1+21)] = f3;
}
	f3 = heapFloat[(r0+84)];
	f4 =                         0;
if(!(f3 ==f4)) //_LBB602_7
{
	f3 = heapFloat[(r0+138)];
	f0 = f0*f3;
	f0 = f0*f1;
	f3 = heapFloat[(r0+126)];
	f5 = heapFloat[(r0+139)];
	f6 = heapFloat[(r0+140)];
	f0 = f3+f0;
	f2 = f2*f5;
	heapFloat[(r0+126)] = f0;
	f0 = f2*f1;
	f2 = heapFloat[(r0+127)];
	f0 = f2+f0;
	f2 = f10*f6;
	heapFloat[(r0+127)] = f0;
	f0 = f2*f1;
	f2 = heapFloat[(r0+128)];
	f0 = f2+f0;
	heapFloat[(r0+128)] = f0;
	f0 = heapFloat[(r0+134)];
	f0 = f0*f1;
	f2 = heapFloat[(r1+12)];
	f3 = heapFloat[(r0+136)];
	f5 = heapFloat[(r0+135)];
	f0 = f2*f0;
	f2 = heapFloat[(r0+130)];
	f6 = heapFloat[(r1+14)];
	f7 = heapFloat[(r1+13)];
	f0 = f2+f0;
	f2 = f5*f1;
	heapFloat[(r0+130)] = f0;
	f0 = f7*f2;
	f2 = heapFloat[(r0+131)];
	f0 = f2+f0;
	f2 = f3*f1;
	heapFloat[(r0+131)] = f0;
	f0 = f6*f2;
	f2 = heapFloat[(r0+132)];
	f0 = f2+f0;
	heapFloat[(r0+132)] = f0;
}
	f0 = heapFloat[(r2+84)];
if(!(f0 ==f4)) //_LBB602_9
{
	f0 = heapFloat[(r1+4)];
	f2 = heapFloat[(r2+138)];
	f0 = f2*f0;
	f0 = f0*f1;
	f2 = heapFloat[(r2+126)];
	f3 = heapFloat[(r1+5)];
	f4 = heapFloat[(r2+139)];
	f5 = heapFloat[(r1+6)];
	f6 = heapFloat[(r2+140)];
	f0 = f2-f0;
	f2 = f4*f3;
	heapFloat[(r2+126)] = f0;
	f0 = f2*f1;
	f2 = heapFloat[(r2+127)];
	f0 = f2-f0;
	f2 = f6*f5;
	heapFloat[(r2+127)] = f0;
	f0 = f2*f1;
	f2 = heapFloat[(r2+128)];
	f0 = f2-f0;
	heapFloat[(r2+128)] = f0;
	f0 = heapFloat[(r2+134)];
	f0 = f0*f1;
	f2 = heapFloat[(r1+16)];
	f3 = heapFloat[(r2+136)];
	f4 = heapFloat[(r2+135)];
	f0 = f2*f0;
	f2 = heapFloat[(r2+130)];
	f5 = heapFloat[(r1+18)];
	f6 = heapFloat[(r1+17)];
	f0 = f2+f0;
	f2 = f4*f1;
	heapFloat[(r2+130)] = f0;
	f0 = f6*f2;
	f2 = heapFloat[(r2+131)];
	f0 = f2+f0;
	f1 = f3*f1;
	heapFloat[(r2+131)] = f0;
	f0 = f5*f1;
	f1 = heapFloat[(r2+132)];
	f0 = f1+f0;
	heapFloat[(r2+132)] = f0;
}
	return;
}