function _ZN31btDefaultCollisionConfiguration31getCollisionAlgorithmCreateFuncEii(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
	var r2;
	var r3;
var __label__ = 0;
	i7 = sp + 0;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+1)];
	r1 = heap32[(fp)];
	r2 = heap32[(fp+2)];
	if(r0 !=8) //_LBB341_3
{
__label__ = 3;
}
else{
	if(r2 !=8) //_LBB341_3
{
__label__ = 3;
}
else{
	r0 = (r1 + 64)|0;
__label__ = 30;
}
}
_4: do {
if (__label__ == 3){
if(!(r0 !=8)) //_LBB341_6
{
if(!(r2 !=1)) //_LBB341_6
{
	r0 = (r1 + 72)|0;
break _4;
}
}
if(!(r0 !=1)) //_LBB341_9
{
if(!(r2 !=8)) //_LBB341_9
{
	r0 = (r1 + 76)|0;
break _4;
}
}
	r3 = r2 | r0;
	if(r3 !=0) //_LBB341_11
{
if(!(r0 >19)) //_LBB341_14
{
if(!(r2 !=28)) //_LBB341_14
{
	r0 = (r1 + 84)|0;
break _4;
}
}
if(!(r2 >19)) //_LBB341_17
{
if(!(r0 !=28)) //_LBB341_17
{
	r0 = (r1 + 80)|0;
break _4;
}
}
_24: do {
	if(r0 >19) //_LBB341_21
{
	if(r2 <20) //_LBB341_23
{
	r3 = (r0 + -21)|0;
	if(uint(r3) <uint(9)) //_LBB341_25
{
	r0 = (r1 + 48)|0;
break _4;
}
}
	if(r0 ==31) //_LBB341_26
{
	r0 = (r1 + 52)|0;
break _4;
}
else{
break _24;
}
}
else{
	if(r2 >19) //_LBB341_20
{
	r0 = (r2 + -21)|0;
	if(uint(r0) <uint(9)) //_LBB341_22
{
	r0 = (r1 + 44)|0;
break _4;
}
}
else{
	r0 = (r1 + 40)|0;
break _4;
}
}
} while(0);
	if(r2 !=31) //_LBB341_29
{
	r0 = (r1 + 60)|0;
}
else{
	r0 = (r1 + 56)|0;
}
}
else{
	r0 = (r1 + 68)|0;
}
}
} while(0);
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	r_g0 = r0;
	return;
}