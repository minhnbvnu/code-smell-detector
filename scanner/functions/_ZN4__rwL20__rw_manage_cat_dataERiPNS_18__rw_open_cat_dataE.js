function _ZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataE(sp)
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
var __label__ = 0;
	i7 = sp + -16;var g0 = i7>>2; // save stack
	r0 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE4init_2E_b;
	r1 = heapU8[r0];
if(!(r1 != 0)) //_LBB710_5
{
	r1 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE15catalog_bufsize;
	r1 = r1 >> 2;
	r1 = heap32[(r1)];
if(!(r1 ==0)) //_LBB710_4
{
	r2 = 0;
_5: while(true){
	r3 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE8catalogs;
	r3 = r3 >> 2;
	r4 = r2 << 3;
	r3 = heap32[(r3)];
	r3 = (r3 + r4)|0;
	r2 = (r2 + 1)|0;
	r3 = r3 >> 2;
	heap32[(r3)] = -1;
if(!(uint(r2) <uint(r1))) //_LBB710_3
{
break _5;
}
}
}
	r1 = 1;
	heap8[r0] = r1;
}
	r0 = heap32[(fp)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r2 = heap32[(r0)];
_9: do {
	if(r2 !=-1) //_LBB710_27
{
	if(r1 !=0) //_LBB710_30
{
	r3 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE10n_catalogs;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
	r5 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE8catalogs;
	r4 = (r4 + -1)|0;
	r5 = r5 >> 2;
	heap32[(r3)] = r4;
	r3 = heap32[(r5)];
	r2 = r2 << 3;
	r2 = (r3 + r2)|0;
	r4 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE11largest_cat;
	r2 = r2 >> 2;
	heap32[(r2)] = -1;
	r2 = r4 >> 2;
	r0 = heap32[(r0)];
	r4 = heap32[(r2)];
	if(r0 ==r4) //_LBB710_32
{
__label__ = 33; //SET chanka
_13: while(true){
	if(r0 >-1) //_LBB710_33
{
	r6 = r0 << 3;
	r6 = (r3 + r6)|0;
	r6 = r6 >> 2;
	r6 = heap32[(r6)];
	if(r6 ==-1) //_LBB710_35
{
	r0 = (r0 + -1)|0;
}
else{
__label__ = 31;
break _13;
}
}
else{
__label__ = 34;
break _13;
}
}
switch(__label__ ){//multiple entries
case 34:
	r0 = r4;
break;
case 31:
	heap32[(r2)] = r0;
break;
}
	if(uint(r0) >uint(3)) //_LBB710_31
{
__label__ = 40;
break _9;
}
else{
	r0 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE11catalog_buf;
	if(r3 ==r0) //_LBB710_31
{
__label__ = 40;
break _9;
}
else{
	r2 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE15catalog_bufsize;
	r2 = r2 >> 2;
	heap32[(r2)] = 8;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r3;
	heap32[(g0+2)] = 64;
	memcpy(i7);
if(!(r3 ==0)) //_LBB710_42
{
	heap32[(g0)] = r3;
	_ZdaPv(i7);
}
	heap32[(r5)] = r0;
__label__ = 40;
break _9;
}
}
}
else{
__label__ = 40;
break _9;
}
}
else{
	r0 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE15catalog_bufsize;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	if(uint(r2) >=uint(r0)) //_LBB710_7
{
__label__ = 7;
break _9;
}
else{
	r0 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE8catalogs;
	r0 = r0 >> 2;
	r0 = heap32[(r0)];
	r1 = r2 << 3;
	r0 = (r0 + r1)|0;
	r_g0 = r0;
	return;
}
}
}
else{
	if(r1 !=0) //_LBB710_8
{
	r2 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE10n_catalogs;
	r2 = r2 >> 2;
	r3 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE15catalog_bufsize;
	r4 = heap32[(r2)];
	r3 = r3 >> 2;
	r5 = heap32[(r3)];
	if(r4 ==r5) //_LBB710_12
{
	r4 = r4 << 4;
	r5 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE8catalogs;
	heap32[(g0)] = r4;
	_Znaj(i7);
	r4 = r_g0;
	r5 = r5 >> 2;
	r6 = heap32[(r2)];
	r7 = heap32[(r5)];
	r8 = r6 << 3;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r7;
	heap32[(g0+2)] = r8;
	memcpy(i7);
	r8 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE11catalog_buf;
if(!(r7 ==r8)) //_LBB710_14
{
	if(r7 !=0) //_LBB710_15
{
	heap32[(g0)] = r7;
	_ZdaPv(i7);
	r6 = heap32[(r2)];
}
}
	heap32[(r5)] = r4;
	r5 = heap32[(r3)];
	r5 = r5 << 1;
	heap32[(r3)] = r5;
_36: do {
if(!(uint(r6) >=uint(r5))) //_LBB710_20
{
	r3 = (r6 + 1)|0;
_38: while(true){
	r7 = r3 << 3;
	r7 = (r4 + r7)|0;
	r7 = r7 >> 2;
	heap32[(r7+-2)] = -1;
	if(uint(r3) >=uint(r5)) //_LBB710_20
{
break _36;
}
else{
	r3 = (r3 + 1)|0;
}
}
}
} while(0);
	r3 = r6 << 3;
	r3 = (r4 + r3)|0;
	heap32[(r0)] = r6;
	r3 = (r3 + 4)|0;
	r5 = (r1 + 4)|0;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = 4;
	memcpy(i7);
	r3 = heap32[(r0)];
	r3 = r3 << 3;
	r5 = r1 >> 2;
	r3 = (r4 + r3)|0;
	r4 = heap32[(r5)];
	r3 = r3 >> 2;
	heap32[(r3)] = r4;
	r0 = heap32[(r0)];
	r3 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE11largest_cat;
	r3 = r3 >> 2;
	r4 = heap32[(r3)];
if(!(uint(r0) <=uint(r4))) //_LBB710_22
{
	heap32[(r3)] = r0;
}
	r0 = (r6 + 1)|0;
	heap32[(r2)] = r0;
	r_g0 = r1;
	return;
}
else{
	r3 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE8catalogs;
	r3 = r3 >> 2;
	heap32[(r0)] = 0;
	r3 = heap32[(r3)];
	r5 = r3 >> 2;
	r5 = heap32[(r5)];
_46: do {
	if(r5 !=-1) //_LBB710_11
{
	r5 = 0;
_48: while(true){
	r6 = r5 << 3;
	r6 = (r3 + r6)|0;
	r5 = (r5 + 1)|0;
	r6 = r6 >> 2;
	heap32[(r0)] = r5;
	r6 = heap32[(r6+2)];
if(!(r6 !=-1)) //_LBB710_23
{
break _46;
}
}
}
else{
	r5 = 0;
}
} while(0);
	r6 = _ZZN4__rwL20__rw_manage_cat_dataERiPNS_18__rw_open_cat_dataEE11largest_cat;
	r6 = r6 >> 2;
	r7 = heap32[(r6)];
if(!(uint(r5) <=uint(r7))) //_LBB710_26
{
	heap32[(r6)] = r5;
}
	r5 = r5 << 3;
	r5 = (r3 + r5)|0;
	r5 = (r5 + 4)|0;
	r6 = (r1 + 4)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r6;
	heap32[(g0+2)] = 4;
	memcpy(i7);
	r0 = heap32[(r0)];
	r0 = r0 << 3;
	r5 = r1 >> 2;
	r0 = (r3 + r0)|0;
	r3 = heap32[(r5)];
	r0 = r0 >> 2;
	r4 = (r4 + 1)|0;
	heap32[(r0)] = r3;
	heap32[(r2)] = r4;
	r_g0 = r1;
	return;
}
}
else{
__label__ = 7;
}
}
} while(0);
if (__label__ == 7){
	r1 = 0;
}
	r_g0 = r1;
	return;
}