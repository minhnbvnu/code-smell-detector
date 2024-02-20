function _ZN23btDiscreteDynamicsWorld23synchronizeMotionStatesEv(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
	var f0;
	var f1;
	var f2;
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = _2E_str1562;
	heap32[(g0)] = r0;
	r0 = heap32[(fp)];
	_ZN15CProfileManager13Start_ProfileEPKc(i7);
	r1 = heapU8[r0+246];
_1: do {
	if(r1 !=0) //_LBB667_2
{
	r1 = r0 >> 2;
	r2 = heap32[(r1+2)];
if(!(r2 <1)) //_LBB667_13
{
	r2 = 0;
_4: while(true){
	r3 = heap32[(r1+4)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = heapU8[r3+232];
	r4 = r4 & 2;
if(!(r4 ==0)) //_LBB667_7
{
if(!(r3 ==0)) //_LBB667_7
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	_ZN23btDiscreteDynamicsWorld28synchronizeSingleMotionStateEP11btRigidBody(i7);
}
}
	r2 = (r2 + 1)|0;
	r3 = heap32[(r1+2)];
	if(r3 >r2) //_LBB667_4
{
continue _4;
}
else{
break _1;
}
}
}
}
else{
	r1 = r0 >> 2;
	r2 = heap32[(r1+52)];
	if(r2 >0) //_LBB667_8
{
	r2 = 0;
_12: while(true){
	r3 = heap32[(r1+54)];
	r4 = r2 << 2;
	r3 = (r3 + r4)|0;
	r3 = r3 >> 2;
	r3 = heap32[(r3)];
	r4 = r3 >> 2;
	r4 = heap32[(r4+54)];
if(!(r4 ==2)) //_LBB667_12
{
if(!(r4 ==5)) //_LBB667_12
{
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	_ZN23btDiscreteDynamicsWorld28synchronizeSingleMotionStateEP11btRigidBody(i7);
}
}
	r2 = (r2 + 1)|0;
	r3 = heap32[(r1+52)];
	if(r3 >r2) //_LBB667_9
{
continue _12;
}
else{
break _1;
}
}
}
}
} while(0);
	r0 = _ZN15CProfileManager11CurrentNodeE;
	r0 = r0 >> 2;
	r1 = heap32[(r0)];
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r3 = (r3 + -1)|0;
	heap32[(r2+4)] = r3;
_19: do {
if(!(r3 !=0)) //_LBB667_19
{
	r3 = heap32[(r2+1)];
	if(r3 !=0) //_LBB667_16
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
	if(r1 !=0) //_LBB667_19
{
break _19;
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
	return;
}