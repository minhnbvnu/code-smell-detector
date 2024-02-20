function _ZNK10__cxxabiv121__vmi_class_type_info20__do_find_public_srcEiPKvPKNS_17__class_type_infoES2_(sp)
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
var __label__ = 0;
	i7 = sp + -24;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+4)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+3)];
	if(r0 !=r1) //_LBB839_4
{
__label__ = 4;
}
else{
	r4 = r3 >> 2;
	r5 = r2 >> 2;
	r4 = heap32[(r4+1)];
	r5 = heap32[(r5+1)];
	r6 = _2E_str26;
	r4 = r4 == 0 ? r6 : r4;
	r5 = r5 == 0 ? r6 : r5;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r4;
	strcmp(i7);
	r6 = r_g0;
	if(r6 <0) //_LBB839_4
{
__label__ = 4;
}
else{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	strcmp(i7);
	r4 = r_g0;
	if(r4 <0) //_LBB839_4
{
__label__ = 4;
}
else{
	r0 = 6;
__label__ = 15;
}
}
}
if (__label__ == 4){
	r4 = heap32[(fp+1)];
	r5 = r2 >> 2;
	r5 = heap32[(r5+3)];
	r5 = (r5 + 1)|0;
_7: while(true){
	if(r5 !=1) //_LBB839_5
{
	r6 = r5 << 3;
	r6 = (r2 + r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6+1)];
	r7 = r6 & 2;
_10: do {
	if(r7 !=0) //_LBB839_7
{
	r7 = r6 & 1;
if(!(r7 ==0)) //_LBB839_9
{
	if(r4 ==-3) //_LBB839_6
{
break _10;
}
}
	r8 = r5 << 1;
	r6 = r6 >> 8;
	if(r7 != 0) //_LBB839_11
{
	r9 = r0 >> 2;
	r9 = heap32[(r9)];
	r6 = (r9 + r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
}
	r8 = r8 << 2;
	r8 = (r2 + r8)|0;
	r8 = r8 >> 2;
	r8 = heap32[(r8)];
	r9 = r8 >> 2;
	r9 = heap32[(r9)];
	r9 = r9 >> 2;
	r9 = heap32[(r9+7)];
	r6 = (r0 + r6)|0;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r3;
	heap32[(g0+4)] = r1;
	__FUNCTION_TABLE__[(r9)>>2](i7);
	r6 = r_g0;
if(!(r6 <4)) //_LBB839_6
{
__label__ = 12;
break _7;
}
}
} while(0);
	r5 = (r5 + -1)|0;
continue _7;
}
else{
__label__ = 14;
break _7;
}
}
switch(__label__ ){//multiple entries
case 14:
	r0 = 1;
break;
case 12:
	r0 = r6 | r7;
	r_g0 = r0;
	return;
break;
}
}
	r_g0 = r0;
	return;
}