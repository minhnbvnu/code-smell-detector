function _Z21btAdjustAngleToLimitsfff(sp)
{
	var i7;
	var fp = sp>>2;
	var f0;
	var f1;
	var f2;
	var f3;
	var f4;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	f0 = heapFloat[(fp+1)];
	f1 = heapFloat[(fp+2)];
	f2 = heapFloat[(fp)];
_1: do {
if(!(f0 >=f1)) //_LBB589_39
{
	if(f2 >=f0) //_LBB589_20
{
	if(f2 <=f1) //_LBB589_39
{
break _1;
}
else{
	f1 = f2-f1;
	heapFloat[(g0)] = f1;
	heap32[(g0+1)] = 1086918619;
	fmodf(i7);
	f1 = f_g0;
	f3 =       -3.1415927410125732;
	if(f1 >=f3) //_LBB589_23
{
	f4 =        3.1415927410125732;
	if(f1 >f4) //_LBB589_25
{
	f4 =       -6.2831854820251465;
	f1 = f1+f4;
}
}
else{
	f4 =        6.2831854820251465;
	f1 = f1+f4;
}
	f4 =                         0;
	if(f1 <f4) //_LBB589_28
{
	f1 = -f1;
}
	f0 = f2-f0;
	heapFloat[(g0)] = f0;
	heap32[(g0+1)] = 1086918619;
	fmodf(i7);
	f0 = f_g0;
	if(f0 >=f3) //_LBB589_31
{
	f3 =        3.1415927410125732;
	if(f0 >f3) //_LBB589_33
{
	f3 =       -6.2831854820251465;
	f0 = f0+f3;
}
}
else{
	f3 =        6.2831854820251465;
	f0 = f0+f3;
}
	if(f0 <f4) //_LBB589_36
{
	f0 = -f0;
}
	if(f0 >=f1) //_LBB589_39
{
break _1;
}
else{
	f0 =       -6.2831854820251465;
	f2 = f2+f0;
}
}
}
else{
	f0 = f0-f2;
	heapFloat[(g0)] = f0;
	heap32[(g0+1)] = 1086918619;
	fmodf(i7);
	f0 = f_g0;
	f3 =       -3.1415927410125732;
	if(f0 >=f3) //_LBB589_4
{
	f4 =        3.1415927410125732;
	if(f0 >f4) //_LBB589_6
{
	f4 =       -6.2831854820251465;
	f0 = f0+f4;
}
}
else{
	f4 =        6.2831854820251465;
	f0 = f0+f4;
}
	f4 =                         0;
	if(f0 <f4) //_LBB589_9
{
	f0 = -f0;
}
	f1 = f1-f2;
	heapFloat[(g0)] = f1;
	heap32[(g0+1)] = 1086918619;
	fmodf(i7);
	f1 = f_g0;
	if(f1 >=f3) //_LBB589_12
{
	f3 =        3.1415927410125732;
	if(f1 >f3) //_LBB589_14
{
	f3 =       -6.2831854820251465;
	f1 = f1+f3;
}
}
else{
	f3 =        6.2831854820251465;
	f1 = f1+f3;
}
	if(f1 <f4) //_LBB589_17
{
	f1 = -f1;
}
if(!(f0 <f1)) //_LBB589_39
{
	f0 =        6.2831854820251465;
	f0 = f2+f0;
	f_g0 = f0;
	return;
}
}
}
} while(0);
	f_g0 = f2;
	return;
}