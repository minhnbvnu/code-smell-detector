function _ZN11btRigidBody24checkCollideWithOverrideEP17btCollisionObject(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
	var r4;
	var r5;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heapU8[r0+232];
	r1 = r1 & 2;
_1: do {
	if(r1 !=0) //_LBB681_2
{
	if(r0 ==0) //_LBB681_1
{
__label__ = 1;
}
else{
	r1 = heap32[(fp)];
	r1 = r1 >> 2;
	r2 = heap32[(r1+120)];
	r3 = 0;
_4: while(true){
	if(r2 >r3) //_LBB681_4
{
	r4 = heap32[(r1+122)];
	r5 = r3 << 2;
	r4 = (r4 + r5)|0;
	r4 = r4 >> 2;
	r4 = heap32[(r4)];
	r4 = r4 >> 2;
	r5 = heap32[(r4+5)];
	if(r5 !=r0) //_LBB681_6
{
	r4 = heap32[(r4+6)];
	if(r4 ==r0) //_LBB681_5
{
break _4;
}
else{
	r3 = (r3 + 1)|0;
}
}
else{
break _4;
}
}
else{
__label__ = 1;
break _1;
}
}
	r0 = 0;
__label__ = 9;
}
}
else{
__label__ = 1;
}
} while(0);
if (__label__ == 1){
	r0 = 1;
}
	r0 = r0 & 255;
	r_g0 = r0;
	return;
}