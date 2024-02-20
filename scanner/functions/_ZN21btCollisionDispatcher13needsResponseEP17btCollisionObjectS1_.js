function _ZN21btCollisionDispatcher13needsResponseEP17btCollisionObjectS1_(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r0 = heap32[(r0+51)];
	r1 = r0 & 4;
if(!(r1 !=0)) //_LBB168_4
{
	r1 = heap32[(fp+2)];
	r1 = r1 >> 2;
	r1 = heap32[(r1+51)];
	r2 = r1 & 4;
if(!(r2 !=0)) //_LBB168_4
{
	r0 = r0 & 3;
	if(r0 ==0) //_LBB168_5
{
	r0 = 1;
	r_g0 = r0;
	return;
}
else{
	r0 = r1 & 3;
	r1 = 0;
	r0 = r0 == r1;
	r0 = r0 & 1;
	r_g0 = r0;
	return;
}
}
}
	r0 = 0;
	r_g0 = r0;
	return;
}