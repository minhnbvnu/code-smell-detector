function _ZN23btDiscreteDynamicsWorld15removeRigidBodyEP11btRigidBody(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp)];
	r1 = r0 >> 2;
	r2 = heap32[(fp+1)];
	r3 = heap32[(r1+52)];
	r4 = 0;
_1: while(true){
	if(r3 >r4) //_LBB662_1
{
	r5 = heap32[(r1+54)];
	r6 = r4 << 2;
	r5 = (r5 + r6)|0;
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	if(r5 !=r2) //_LBB662_3
{
	r4 = (r4 + 1)|0;
continue _1;
}
else{
__label__ = 5;
break _1;
}
}
else{
__label__ = 4;
break _1;
}
}
if (__label__ == 4){
	r4 = r3;
}
if(!(r3 <=r4)) //_LBB662_8
{
	r3 = (r3 + -1)|0;
	r4 = r4 << 2;
	r5 = heap32[(r1+54)];
	r3 = r3 << 2;
	r4 = (r5 + r4)|0;
	r5 = (r5 + r3)|0;
	r4 = r4 >> 2;
	r5 = r5 >> 2;
	r6 = heap32[(r4)];
	r5 = heap32[(r5)];
	heap32[(r4)] = r5;
	r4 = heap32[(r1+54)];
	r3 = (r4 + r3)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = r6;
	r3 = heap32[(r1+52)];
	r3 = (r3 + -1)|0;
	heap32[(r1+52)] = r3;
}
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r2;
	_ZN16btCollisionWorld21removeCollisionObjectEP17btCollisionObject(i7);
	return;
}