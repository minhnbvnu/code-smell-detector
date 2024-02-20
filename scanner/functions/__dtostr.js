function __dtostr(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	f0 = llvm_readDouble((sp));
	r0 = sp + -8;
	llvm_writeDouble((sp+-8),f0);
	r0 = r0 >> 2;
	r0 = heap32[(r0+1)];
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp+3)];
	r3 = heap32[(fp+4)];
	r4 = heap32[(fp+5)];
	r5 = heap32[(fp+6)];
	r6 = heap32[(fp+-2)];
	if(r0 >2146435071) //_LBB738_3
{
	r7 = r0 ^ 2146959360;
	r7 = r6 | r7;
	if(r7 ==0) //_LBB738_13
{
__label__ = 13;
}
else{
	r7 = r0 ^ 2146435072;
	r6 = r6 | r7;
	if(r6 !=0) //_LBB738_21
{
__label__ = 20;
}
else{
__label__ = 5;
}
}
}
else{
	r7 = r0 ^ -1048576;
	r7 = r6 | r7;
	if(r7 ==0) //_LBB738_5
{
__label__ = 5;
}
else{
	r7 = r0 ^ -524288;
	r6 = r6 | r7;
	if(r6 ==0) //_LBB738_13
{
__label__ = 13;
}
else{
__label__ = 20;
}
}
}
_6: do {
switch(__label__ ){//multiple entries
case 13:
	if(r2 >0) //_LBB738_15
{
	r0 = (r2 + -1)|0;
	r3 = 2;
	r4 = 0;
	r5 = (r2 + 2)|0;
	r0 = uint(r0) > uint(r3) ? r0 : r3;
	r3 = (r4 - r2)|0;
	r0 = (r5 - r0)|0;
	r4 = _2E_str9655;
	r5 = r1;
_10: while(true){
	r6 = heapU8[r4];
	r0 = (r0 + -1)|0;
	r7 = (r5 + 1)|0;
	r4 = (r4 + 1)|0;
	heap8[r5] = r6;
	r5 = r7;
if(!(r0 !=0)) //_LBB738_16
{
break _10;
}
}
	r0 = -3;
	r4 = 3;
	r0 = uint(r3) > uint(r0) ? r2 : r4;
}
else{
	r0 = 0;
}
	if(r0 >=r2) //_LBB738_20
{
	r_g0 = r0;
	return;
}
else{
__label__ = 11;
break _6;
}
break;
case 20:
	f1 =                         0;
	if(f0 !=f1) //_LBB738_32
{
	r0 = r0 >>> 20;
	r0 = r0 & 2047;
	r0 = (r0 + -1023)|0;
	f2 = r0; //fitod r0, f2
	f3 =        0.3010299956639812;
	f2 = f2*f3;
	r0 = f2|0;
	r6 = (r0 + 1)|0;
	if(f0 <f1) //_LBB738_34
{
	f1 = -f0;
	r2 = (r2 + -1)|0;
	r7 = (r1 + 1)|0;
	r8 = 45;
	heap8[r1] = r8;
}
else{
	r7 = r1;
	f1 = f0;
}
_23: do {
	if(r4 ==0) //_LBB738_37
{
	f2 =                       0.5;
}
else{
	f2 =                       0.5;
	r8 = r4;
	f3 =       0.10000000000000001;
_26: while(true){
	r8 = (r8 + -1)|0;
	f2 = f2*f3;
if(!(r8 !=0)) //_LBB738_38
{
break _23;
}
}
}
} while(0);
	f1 = f1+f2;
	f2 =                         1;
	if(f1 <f2) //_LBB738_41
{
	r2 = (r2 + -1)|0;
	r8 = (r7 + 1)|0;
	r9 = 48;
	heap8[r7] = r9;
	r7 = r8;
}
_32: do {
	if(r6 >0) //_LBB738_44
{
_34: do {
	if(uint(r6) >uint(10)) //_LBB738_46
{
	r0 = (r0 + 1)|0;
	f2 =                        10;
	f3 =               10000000000;
_36: while(true){
	r0 = (r0 + -10)|0;
	f2 = f2*f3;
if(!(uint(r0) >uint(10))) //_LBB738_47
{
break _34;
}
}
}
else{
	f2 =                        10;
	r0 = r6;
}
} while(0);
	if(uint(r0) >uint(1)) //_LBB738_50
{
	r0 = (r0 + -1)|0;
	f3 =                        10;
_42: while(true){
	r0 = (r0 + -1)|0;
	f2 = f2*f3;
if(!(r0 !=0)) //_LBB738_51
{
break _42;
}
}
	r0 = 1;
}
else{
	r0 = 1;
}
_46: while(true){
	f3 =       0.90000000000000002;
	if(f2 >f3) //_LBB738_53
{
	f3 = f1/f2;
	r8 = f3|0;
	if(r0 ==0) //_LBB738_56
{
__label__ = 52;
}
else{
	r9 = r8 & 255;
	if(r9 !=0) //_LBB738_56
{
__label__ = 52;
}
else{
__label__ = 64;
}
}
if (__label__ == 52){
	r0 = (r8 + 48)|0;
	heap8[r7] = r0;
	if(r2 !=0) //_LBB738_70
{
	r0 = r8 << 24;
	r0 = r0 >> 24;
	f3 = r0; //fitod r0, f3
	f3 = f3*f2;
	r7 = (r7 + 1)|0;
	f1 = f1-f3;
	r2 = (r2 + -1)|0;
	r0 = 0;
}
else{
break _46;
}
}
	f3 =                        10;
	f2 = f2/f3;
}
else{
__label__ = 66;
break _32;
}
}
	f0 = f0/f2;
	llvm_writeDouble((i7),f0);
	heap32[(g0+2)] = r1;
	heap32[(g0+3)] = r2;
	heap32[(g0+4)] = r3;
	heap32[(g0+5)] = r4;
	heap32[(g0+6)] = 0;
	__dtostr(i7);
	r0 = r_g0;
	if(r0 ==0) //_LBB738_92
{
__label__ = 83;
}
else{
	r3 = (r0 + r7)|0;
	r7 = (r3 + 1)|0;
	if(r2 !=r0) //_LBB738_60
{
	r3 = (r3 + 2)|0;
	r4 = 101;
	heap8[r7] = r4;
	r7 = r3;
}
	r2 = (r2 + -1)|0;
	r3 = (r2 - r0)|0;
_60: do {
	if(r6 <1000) //_LBB738_66
{
	if(r6 <100) //_LBB738_93
{
	if(r6 >9) //_LBB738_95
{
__label__ = 90;
break _60;
}
else{
__label__ = 91;
break _60;
}
}
else{
__label__ = 87;
break _60;
}
}
else{
	if(r2 !=r0) //_LBB738_64
{
	r0 = (r6 / 1000)|0;
	r2 = (r7 + 1)|0;
	r0 = (r0 + 48)|0;
	heap8[r7] = r0;
	r7 = r2;
}
	r3 = (r3 + -1)|0;
	r6 = (r6 % 1000)|0;
__label__ = 87;
}
} while(0);
if (__label__ == 87){
	if(r3 !=0) //_LBB738_97
{
	r0 = (r6 / 100)|0;
	r2 = (r7 + 1)|0;
	r0 = (r0 + 48)|0;
	heap8[r7] = r0;
	r7 = r2;
}
	r3 = (r3 + -1)|0;
	r6 = (r6 % 100)|0;
__label__ = 90;
}
if (__label__ == 90){
	if(r3 !=0) //_LBB738_101
{
	r0 = (r6 / 10)|0;
	r2 = (r7 + 1)|0;
	r0 = (r0 + 48)|0;
	heap8[r7] = r0;
	r7 = r2;
}
	r3 = (r3 + -1)|0;
	r6 = (r6 % 10)|0;
}
	if(r3 !=0) //_LBB738_68
{
	r0 = (r6 + 48)|0;
	heap8[r7] = r0;
	if(r3 ==1) //_LBB738_92
{
__label__ = 83;
}
else{
	r7 = (r7 + 1)|0;
__label__ = 82;
}
}
else{
__label__ = 82;
}
}
}
else{
	f2 =       0.10000000000000001;
__label__ = 66;
}
} while(0);
_81: do {
if (__label__ == 66){
	if(r7 ==r1) //_LBB738_75
{
	if(r2 ==0) //_LBB738_92
{
__label__ = 83;
break _81;
}
else{
	r2 = (r2 + -1)|0;
	r6 = (r7 + 1)|0;
	r0 = 48;
	heap8[r7] = r0;
	r7 = r6;
}
}
if(!(r4 !=0)) //_LBB738_80
{
	r6 = 1;
	r6 = (r6 - r1)|0;
	r6 = (r6 + r7)|0;
if(!(uint(r6) <uint(r3))) //_LBB738_80
{
__label__ = 82;
break _81;
}
}
	if(r2 ==0) //_LBB738_92
{
__label__ = 83;
}
else{
	r6 = (r2 + -1)|0;
	r0 = (r7 + 1)|0;
	r2 = 46;
	heap8[r7] = r2;
	if(r5 ==0) //_LBB738_83
{
if(!(r4 !=0)) //_LBB738_85
{
	r3 = (r1 + r3)|0;
	r3 = (r3 + 1)|0;
	r4 = (r3 - r0)|0;
}
}
else{
	r3 = r4 == 0 ? r3 : r4;
	r3 = (r1 + r3)|0;
	r3 = (r3 + 1)|0;
	r4 = (r3 - r0)|0;
}
	if(uint(r4) >uint(r6)) //_LBB738_92
{
__label__ = 83;
}
else{
	if(r4 !=0) //_LBB738_88
{
	r3 = (r4 + 1)|0;
	r6 = (r7 + 1)|0;
	f3 =                        10;
_99: while(true){
	f0 = f1/f2;
	r0 = f0|0;
	r2 = r0 << 24;
	r2 = r2 >> 24;
	f0 = r2; //fitod r2, f0
	f0 = f0*f2;
	r4 = (r4 + -1)|0;
	f2 = f2/f3;
	f1 = f1-f0;
	r2 = (r6 + 1)|0;
	r0 = (r0 + 48)|0;
	heap8[r6] = r0;
	r6 = r2;
if(!(r4 !=0)) //_LBB738_89
{
break _99;
}
}
	r7 = (r7 + r3)|0;
__label__ = 82;
}
else{
	r7 = r0;
__label__ = 82;
}
}
}
}
} while(0);
switch(__label__ ){//multiple entries
case 83:
	r1 = 0;
	r_g0 = r1;
	return;
break;
case 82:
	r3 = 0;
	heap8[r7] = r3;
	r1 = (r7 - r1)|0;
	r_g0 = r1;
	return;
break;
}
}
else{
	r3 = 1;
	r5 = (r4 + 2)|0;
	r4 = r4 == 0 ? r3 : r5;
	r5 = 8;
	r2 = uint(r4) > uint(r2) ? r5 : r4;
	if(r2 ==0) //_LBB738_24
{
__label__ = 23;
}
else{
	if(r0 <0) //_LBB738_25
{
	r0 = 45;
	heap8[r1] = r0;
	r0 = r3;
__label__ = 25;
}
else{
__label__ = 23;
}
}
if (__label__ == 23){
	r0 = 0;
}
	if(uint(r0) <uint(r2)) //_LBB738_28
{
	r5 = 48;
_115: while(true){
	r4 = (r0 + 1)|0;
	heap8[r1+r0] = r5;
	r0 = r4;
if(!(r2 !=r4)) //_LBB738_29
{
break _115;
}
}
	r0 = r2;
}
	r2 = 2;
	r4 = heapU8[r1];
	r2 = r4 == 48 ? r3 : r2;
	r3 = 46;
	r4 = 0;
	heap8[r1+r2] = r3;
	heap8[r1+r0] = r4;
	r_g0 = r0;
	return;
}
break;
case 5:
	if(r2 >0) //_LBB738_7
{
	r0 = (r2 + -1)|0;
	r3 = 2;
	r4 = 0;
	r5 = (r2 + 2)|0;
	r0 = uint(r0) > uint(r3) ? r0 : r3;
	r3 = (r4 - r2)|0;
	r0 = (r5 - r0)|0;
	r4 = _2E_str7654;
	r5 = r1;
_122: while(true){
	r6 = heapU8[r4];
	r0 = (r0 + -1)|0;
	r7 = (r5 + 1)|0;
	r4 = (r4 + 1)|0;
	heap8[r5] = r6;
	r5 = r7;
if(!(r0 !=0)) //_LBB738_8
{
break _122;
}
}
	r0 = -3;
	r4 = 3;
	r0 = uint(r3) > uint(r0) ? r2 : r4;
}
else{
	r0 = 0;
}
	if(r0 >=r2) //_LBB738_12
{
__label__ = 12;
}
else{
__label__ = 11;
}
break;
}
} while(0);
if (__label__ == 11){
	r2 = 0;
	heap8[r1+r0] = r2;
	r0 = (r0 + 1)|0;
}
	r_g0 = r0;
	return;
}