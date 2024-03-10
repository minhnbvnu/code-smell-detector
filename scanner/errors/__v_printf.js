function __v_printf(sp)
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
	var r10;
	var r11;
	var r12;
	var r13;
	var r14;
	var r15;
	var r16;
	var r17;
	var r18;
	var r19;
	var r20;
	var r21;
	var r22;
	var r23;
	var f0;
	var f1;
var __label__ = 0;
	i7 = sp + -184;var g0 = i7>>2; // save stack
	r0 = sp + -136;
	r1 = heap32[(fp+2)];
	r2 = heap32[(fp)];
	r3 = heap32[(fp+1)];
	r0 = (r0 + 1)|0;
	heap32[(fp+-1)] = r1;
	heap32[(fp+-2)] = 0;
_1: while(true){
	r4 = heapU8[r3];
	if(r4 ==0) //_LBB801_209
{
__label__ = 197;
break _1;
}
else{
	r1 = 0;
	r5 = r4;
_4: while(true){
	r5 = r5 & 255;
	if(r5 ==0) //_LBB801_4
{
break _4;
}
else{
	if(r5 !=37) //_LBB801_1
{
	r5 = (r3 - r1)|0;
	r5 = heapU8[r5+1];
	r1 = (r1 + -1)|0;
}
else{
break _4;
}
}
}
	r5 = 0;
	if(r1 !=0) //_LBB801_6
{
	r4 = (r5 - r1)|0;
	if(r4 <0) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r6 = heap32[(fp+-2)];
	r7 = (r6 - r1)|0;
	if(uint(r7) <uint(r6)) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r6 = (r3 - r1)|0;
	r7 = r2 >> 2;
	r8 = heap32[(r7+1)];
	r7 = heap32[(r7)];
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r7;
	__FUNCTION_TABLE__[(r8)>>2](i7);
	r4 = heap32[(fp+-2)];
	r4 = (r4 - r1)|0;
	r1 = (r3 - r1)|0;
	heap32[(fp+-2)] = r4;
	r4 = heapU8[r1];
	r3 = r6;
}
}
}
	r1 = r4 & 255;
	if(r1 !=37) //_LBB801_207
{
continue _1;
}
else{
	r3 = (r3 + 1)|0;
	r1 = 32;
	r4 = r5;
	r6 = r5;
	r7 = r5;
	r8 = r5;
	r9 = r5;
	r10 = r5;
	r11 = r5;
_15: while(true){
	r12 = r4;
	r13 = r3;
	r14 = heapU8[r13];
	r3 = (r13 + 1)|0;
	heap8[sp+-145] = r14;
_17: do {
	if(r14 >99) //_LBB801_29
{
	if(r14 >110) //_LBB801_37
{
	if(r14 >114) //_LBB801_41
{
	if(r14 >119) //_LBB801_44
{
	if(r14 ==122) //_LBB801_47
{
__label__ = 50;
break _17;
}
else{
__label__ = 44;
break _15;
}
}
else{
__label__ = 41;
break _15;
}
}
else{
	if(r14 ==111) //_LBB801_105
{
__label__ = 99;
break _15;
}
else{
	if(r14 ==112) //_LBB801_97
{
__label__ = 91;
break _15;
}
else{
	if(r14 ==113) //_LBB801_53
{
__label__ = 49;
break _17;
}
else{
continue _1;
}
}
}
}
}
else{
	if(r14 >104) //_LBB801_34
{
	if(r14 ==105) //_LBB801_108
{
__label__ = 102;
break _15;
}
else{
	if(r14 ==106) //_LBB801_53
{
__label__ = 49;
break _17;
}
else{
	if(r14 ==108) //_LBB801_47
{
__label__ = 50;
break _17;
}
else{
continue _1;
}
}
}
}
else{
	if(r14 ==100) //_LBB801_108
{
__label__ = 102;
break _15;
}
else{
	r4 = (r14 + -102)|0;
	if(uint(r4) <uint(2)) //_LBB801_135
{
__label__ = 129;
break _15;
}
else{
	if(r14 ==104) //_LBB801_48
{
__label__ = 48;
break _17;
}
else{
continue _1;
}
}
}
}
}
}
else{
	if(r14 >44) //_LBB801_20
{
	if(r14 >75) //_LBB801_24
{
	if(r14 >97) //_LBB801_27
{
__label__ = 26;
break _15;
}
else{
	if(r14 ==76) //_LBB801_53
{
__label__ = 49;
break _17;
}
else{
__label__ = 25;
break _15;
}
}
}
else{
	r4 = 1;
	if(r14 ==45) //_LBB801_11
{
continue _15;
}
else{
	if(r14 ==46) //_LBB801_61
{
	r4 = heapU8[r3];
	if(r4 !=42) //_LBB801_63
{
	r4 = sp + -144;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = r4;
	strtol(i7);
	r14 = 0;
	r11 = r_g0 < 0 ? r14 : r_g0;
	r3 = heap32[(fp+-36)];
}
else{
	r4 = sp + -4;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r4 = r_g0 >> 2;
	r4 = heap32[(r4)];
	r14 = 0;
	r11 = r4 < 0 ? r14 : r4;
	r3 = (r13 + 2)|0;
}
	r8 = 1;
	r4 = r12;
	if(uint(r11) >uint(10240)) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
continue _15;
}
}
else{
	r4 = (r14 + -48)|0;
	if(uint(r4) <uint(10)) //_LBB801_57
{
	r4 = r8 & 255;
	if(r4 !=0) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r4 = sp + -144;
	heap32[(g0)] = r13;
	heap32[(g0+1)] = r4;
	strtoul(i7);
	r10 = r_g0;
	if(uint(r10) >uint(10240)) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r8 = 0;
	r4 = r12 & 255;
	r13 = heapU8[sp+-145];
	r14 = 48;
	r13 = r13 == r14;
	r4 = r4 == r8;
	r4 = r13 & r4;
	r1 = r4 != 0 ? r14 : r1;
	r3 = heap32[(fp+-36)];
	r4 = r12;
continue _15;
}
}
}
else{
continue _1;
}
}
}
}
}
else{
	if(r14 >36) //_LBB801_17
{
	if(r14 ==37) //_LBB801_66
{
__label__ = 62;
break _15;
}
else{
	if(r14 ==42) //_LBB801_60
{
	r4 = sp + -4;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r4 = r_g0 >> 2;
	r4 = heap32[(r4)];
	r13 = r4 >> 31;
	r14 = (r4 + r13)|0;
	r15 = 1;
	r10 = r14 ^ r13;
	r4 = r4 < 0 ? r15 : r12;
	if(uint(r10) >uint(10240)) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
continue _15;
}
}
else{
	if(r14 ==43) //_LBB801_56
{
	r7 = 1;
	r4 = r12;
continue _15;
}
else{
continue _1;
}
}
}
}
else{
	if(r14 ==0) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	if(r14 ==32) //_LBB801_55
{
	r6 = 1;
	r4 = r12;
continue _15;
}
else{
	if(r14 ==35) //_LBB801_51
{
	r5 = 255;
__label__ = 48;
}
else{
continue _1;
}
}
}
}
}
}
} while(0);
switch(__label__ ){//multiple entries
case 49:
	r9 = (r9 + 1)|0;
break;
case 48:
	r9 = (r9 + -1)|0;
	r4 = r12;
continue _15;
break;
}
	r9 = (r9 + 1)|0;
	r4 = r12;
}
_71: do {
switch(__label__ ){//multiple entries
case 26:
	if(r14 ==98) //_LBB801_49
{
	r4 = 0;
	r13 = 2;
	r14 = r4;
	r15 = r4;
__label__ = 104;
break _71;
}
else{
	if(r14 ==99) //_LBB801_65
{
	r1 = sp + -4;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r1 = r_g0 >> 2;
	r1 = heap32[(r1)];
	heap8[sp+-145] = r1;
__label__ = 62;
break _71;
}
else{
continue _1;
}
}
break;
case 25:
	if(r14 ==88) //_LBB801_50
{
__label__ = 92;
break _71;
}
else{
continue _1;
}
break;
case 44:
	if(r14 !=120) //_LBB801_207
{
continue _1;
}
else{
	r4 = 0;
__label__ = 93;
break _71;
}
break;
case 41:
	if(r14 ==115) //_LBB801_68
{
	r1 = sp + -4;
	heap32[(g0)] = r1;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r1 = r_g0 >> 2;
	r4 = _2E_str38684;
	r1 = heap32[(r1)];
	r1 = r1 == 0 ? r4 : r1;
	heap32[(fp+-36)] = r1;
	r4 = heapU8[r1];
_83: do {
	if(r4 !=0) //_LBB801_70
{
	r4 = (r1 + 1)|0;
	r14 = 0;
_85: while(true){
	r1 = (r14 + 1)|0;
	r6 = heapU8[r4+r14];
	r14 = r1;
if(!(r6 !=0)) //_LBB801_71
{
break _83;
}
}
}
else{
	r1 = 0;
}
} while(0);
	r16 = 0;
	r4 = r8 & 255;
	r4 = r4 != r16;
	r14 = uint(r1) > uint(r11);
	r4 = r4 & r14;
	r14 = 32;
	r4 = r4 != 0 ? r11 : r1;
	r1 = r14;
	r8 = r16;
	r11 = r16;
__label__ = 69;
break _71;
}
else{
	if(r14 ==117) //_LBB801_109
{
	r4 = 0;
	r13 = 10;
	r14 = r4;
	r15 = r4;
__label__ = 104;
break _71;
}
else{
continue _1;
}
}
break;
case 99:
	r4 = r5 & 255;
	if(r4 !=0) //_LBB801_107
{
	r5 = 1;
	r4 = 0;
	r13 = 8;
	r14 = 48;
	heap8[sp+-135] = r14;
	r14 = r4;
	r15 = r5;
__label__ = 104;
break _71;
}
else{
	r4 = 0;
	r13 = 8;
	r14 = r4;
	r5 = r4;
	r15 = r4;
__label__ = 104;
break _71;
}
break;
case 91:
	r14 = 120;
	r5 = 2;
	r9 = 1;
	heap8[sp+-145] = r14;
__label__ = 92;
break _71;
break;
case 102:
	r4 = 0;
	r14 = 1;
	r13 = 10;
	r15 = r4;
__label__ = 104;
break _71;
break;
case 129:
	r4 = sp + -4;
	heap32[(g0)] = r4;
	heap32[(g0+1)] = 8;
	my_arg_test(i7);
	f0 = llvm_readDouble((r_g0));
	heap32[(fp+-36)] = r0;
	r4 = 103;
	r4 = r14 == r4;
	r8 = r8 & 255;
	r16 = 1;
	r9 = 6;
	r10 = r10 == 0 ? r16 : r10;
	r11 = r8 == 0 ? r9 : r11;
	r4 = r4 & 1;
	f1 =                         0;
	r9 = r7 & 255;
	r13 = 0;
	llvm_writeDouble((i7),f0);
	heap32[(g0+2)] = r0;
	heap32[(g0+3)] = 127;
	heap32[(g0+4)] = r10;
	heap32[(g0+5)] = r11;
	heap32[(g0+6)] = r4;
	r4 = r9 != r13;
	r16 = f0 < f1;
	r4 = r4 | r16;
	r16 = r4 & 1;
	__dtostr(i7);
	r4 = r_g0;
_98: do {
	if(r8 !=0) //_LBB801_137
{
	r8 = heap32[(fp+-36)];
	r15 = r13;
_100: while(true){
	r17 = heapU8[r8+r13];
	if(r17 ==0) //_LBB801_161
{
__label__ = 151;
break _100;
}
else{
	r18 = (r8 + r13)|0;
	if(r17 ==46) //_LBB801_149
{
__label__ = 142;
break _100;
}
else{
	r17 = heapU8[r18+1];
	if(r17 ==0) //_LBB801_161
{
__label__ = 151;
break _100;
}
else{
	r19 = r15 << 2;
	if(r17 !=46) //_LBB801_143
{
	r17 = heapU8[r18+2];
	if(r17 ==0) //_LBB801_161
{
__label__ = 151;
break _100;
}
else{
	if(r17 !=46) //_LBB801_146
{
	r17 = heapU8[r18+3];
	if(r17 ==0) //_LBB801_161
{
__label__ = 151;
break _100;
}
else{
	if(r17 ==46) //_LBB801_151
{
__label__ = 143;
break _100;
}
else{
	r15 = (r15 + 1)|0;
	r13 = (r13 + 4)|0;
}
}
}
else{
__label__ = 138;
break _100;
}
}
}
else{
__label__ = 135;
break _100;
}
}
}
}
}
_110: do {
switch(__label__ ){//multiple entries
case 142:
	if(r18 ==0) //_LBB801_161
{
__label__ = 151;
break _110;
}
else{
__label__ = 144;
break _110;
}
break;
case 143:
	r18 = (r18 + 3)|0;
__label__ = 144;
break _110;
break;
case 138:
	r4 = r19 | 2;
	r18 = (r8 + r4)|0;
__label__ = 144;
break _110;
break;
case 135:
	r4 = r19 | 1;
	r18 = (r8 + r4)|0;
__label__ = 144;
break;
}
} while(0);
switch(__label__ ){//multiple entries
case 151:
	r5 = r5 & 255;
	if(r5 ==0) //_LBB801_136
{
break _98;
}
else{
	r5 = 46;
	heap8[r8+r4] = r5;
	r5 = heap32[(fp+-36)];
	r4 = (r4 + r5)|0;
	r5 = 0;
	heap8[r4+1] = r5;
}
break;
case 144:
	if(r11 !=0) //_LBB801_155
{
__label__ = 146;
}
else{
	r4 = r5 & 255;
	if(r4 !=0) //_LBB801_155
{
__label__ = 146;
}
else{
__label__ = 147;
}
}
if (__label__ == 146){
	r18 = (r18 + 1)|0;
}
_123: while(true){
	r4 = r11;
	if(r4 !=0) //_LBB801_158
{
	r11 = (r4 + -1)|0;
	r5 = (r18 + 1)|0;
	r8 = heapU8[r18+1];
	r18 = r5;
	if(r8 !=0) //_LBB801_156
{
__label__ = 147;
}
else{
__label__ = 149;
break _123;
}
}
else{
__label__ = 150;
break _123;
}
}
if (__label__ == 149){
	r18 = r5;
}
	r5 = 0;
	heap8[r18] = r5;
	r11 = r4;
break;
}
}
} while(0);
_130: do {
if(!(r14 !=103)) //_LBB801_199
{
	r4 = heap32[(fp+-36)];
	r5 = 0;
	r8 = r5;
_132: while(true){
	r14 = heapU8[r4+r5];
	if(r14 ==0) //_LBB801_199
{
break _130;
}
else{
	r13 = (r4 + r5)|0;
	if(r14 ==46) //_LBB801_176
{
__label__ = 166;
break _132;
}
else{
	r14 = heapU8[r13+1];
	if(r14 ==0) //_LBB801_199
{
break _130;
}
else{
	r15 = r8 << 2;
	if(r14 !=46) //_LBB801_170
{
	r14 = heapU8[r13+2];
	if(r14 ==0) //_LBB801_199
{
break _130;
}
else{
	if(r14 !=46) //_LBB801_173
{
	r14 = heapU8[r13+3];
	if(r14 ==0) //_LBB801_199
{
break _130;
}
else{
	if(r14 ==46) //_LBB801_178
{
__label__ = 167;
break _132;
}
else{
	r8 = (r8 + 1)|0;
	r5 = (r5 + 4)|0;
}
}
}
else{
__label__ = 162;
break _132;
}
}
}
else{
__label__ = 159;
break _132;
}
}
}
}
}
switch(__label__ ){//multiple entries
case 166:
	if(r13 ==0) //_LBB801_199
{
break _130;
}
break;
case 167:
	r13 = (r13 + 3)|0;
break;
case 162:
	r5 = r15 | 2;
	r13 = (r4 + r5)|0;
break;
case 159:
	r5 = r15 | 1;
	r13 = (r4 + r5)|0;
break;
}
	r4 = 0;
	r5 = r13;
_148: while(true){
	r8 = heapU8[r5];
	if(r8 !=101) //_LBB801_182
{
	if(r8 !=0) //_LBB801_184
{
	r8 = r4 << 2;
	r14 = heapU8[r5+1];
	if(r14 !=101) //_LBB801_186
{
	if(r14 ==0) //_LBB801_183
{
__label__ = 171;
break _148;
}
else{
	r14 = heapU8[r5+2];
	if(r14 !=101) //_LBB801_189
{
	if(r14 ==0) //_LBB801_183
{
__label__ = 171;
break _148;
}
else{
	r14 = heapU8[r5+3];
	if(r14 !=101) //_LBB801_192
{
	if(r14 ==0) //_LBB801_183
{
__label__ = 171;
break _148;
}
else{
	r4 = (r4 + 1)|0;
	r5 = (r5 + 4)|0;
}
}
else{
__label__ = 179;
break _148;
}
}
}
else{
__label__ = 176;
break _148;
}
}
}
else{
__label__ = 173;
break _148;
}
}
else{
__label__ = 171;
break _148;
}
}
else{
__label__ = 182;
break _148;
}
}
switch(__label__ ){//multiple entries
case 171:
	r5 = 0;
break;
case 179:
	r4 = r8 | 3;
	r5 = (r13 + r4)|0;
break;
case 176:
	r4 = r8 | 2;
	r5 = (r13 + r4)|0;
break;
case 173:
	r4 = r8 | 1;
	r5 = (r13 + r4)|0;
break;
}
_163: while(true){
	r4 = (r13 + 1)|0;
	r8 = heapU8[r13+1];
	r13 = r4;
if(!(r8 !=0)) //_LBB801_194
{
break _163;
}
}
	r4 = r5 == 0 ? r4 : r5;
_166: while(true){
	r8 = heapU8[r4+-1];
	r4 = (r4 + -1)|0;
if(!(r8 ==48)) //_LBB801_196
{
break _166;
}
}
	r14 = (r4 + 1)|0;
	r4 = r8 == 46 ? r4 : r14;
	r8 = 0;
	heap8[r4] = r8;
if(!(r5 ==0)) //_LBB801_199
{
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r5;
	strcpy(i7);
}
}
} while(0);
	r4 = r7 | r6;
	r4 = r4 & 255;
if(!(r4 ==0)) //_LBB801_202
{
if(!(f0 <f1)) //_LBB801_202
{
	r4 = heap32[(fp+-36)];
	r5 = (r4 + -1)|0;
	r8 = 32;
	r14 = 43;
	r8 = r9 == 0 ? r8 : r14;
	heap32[(fp+-36)] = r5;
	heap8[r4+-1] = r8;
}
}
	r4 = heap32[(fp+-36)];
	r5 = heapU8[r4];
_175: do {
	if(r5 !=0) //_LBB801_204
{
	r5 = (r4 + 1)|0;
	r8 = 0;
_177: while(true){
	r4 = (r8 + 1)|0;
	r14 = heapU8[r5+r8];
	r8 = r4;
if(!(r14 !=0)) //_LBB801_205
{
break _175;
}
}
}
else{
	r4 = 0;
}
} while(0);
	r10 = uint(r10) < uint(r4) ? r4 : r10;
	r14 = 48;
	r5 = 0;
	r8 = r5;
__label__ = 69;
break;
}
} while(0);
switch(__label__ ){//multiple entries
case 62:
	r1 = heap32[(fp+-2)];
	if(r1 ==-1) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r1 = r2 >> 2;
	r4 = heap32[(r1+1)];
	r1 = heap32[(r1)];
	r5 = sp + -145;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 1;
	heap32[(g0+2)] = r1;
	__FUNCTION_TABLE__[(r4)>>2](i7);
	r1 = heap32[(fp+-2)];
	r1 = (r1 + 1)|0;
	heap32[(fp+-2)] = r1;
continue _1;
}
break;
case 92:
	r4 = r14 & 255;
	r13 = 88;
	r4 = r4 == r13;
	r4 = r4 & 1;
__label__ = 93;
break;
}
if (__label__ == 93){
	r5 = r5 & 255;
	if(r5 !=0) //_LBB801_101
{
	r13 = 48;
	r5 = 2;
	heap8[sp+-135] = r13;
	heap8[sp+-134] = r14;
	r15 = r5;
}
else{
	r5 = 0;
	r15 = r5;
}
	if(uint(r11) >uint(r10)) //_LBB801_104
{
	r14 = 0;
	r13 = 16;
	r10 = r11;
__label__ = 104;
}
else{
	r14 = 0;
	r13 = 16;
__label__ = 104;
}
}
_194: do {
if (__label__ == 104){
	heap32[(fp+-36)] = r0;
	r16 = sp + -4;
	heap32[(g0)] = r16;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r17 = r_g0 >> 2;
	r18 = r14 & 255;
	r16 = 0;
	r17 = heap32[(r17)];
	r18 = r18 != r16;
	r19 = r17 < r16;
	r20 = (r16 - r17)|0;
	r18 = r18 & r19;
	r9 = r9 << 24;
	r17 = r18 != 0 ? r20 : r17;
	r9 = r9 >> 24;
	r19 = r17 & 65535;
	r17 = r9 < 0 ? r19 : r17;
	r19 = heap32[(fp+-36)];
	r20 = r17 & 255;
	r21 = 2;
	r9 = r9 < -1 ? r20 : r17;
	r17 = r18 != 0 ? r21 : r14;
	r14 = (r19 + r15)|0;
	heap8[r14+122] = r16;
	if(r9 !=0) //_LBB801_112
{
	r18 = (r13 + -1)|0;
	r19 = 35;
	r20 = 10;
	r18 = uint(r18) > uint(r19) ? r20 : r13;
	r4 = r4 & 255;
	r13 = 39;
	r19 = 7;
	r4 = r4 == 0 ? r13 : r19;
	r19 = (r15 + 121)|0;
	r20 = -122;
_198: while(true){
	r13 = Math.floor(uint(r9) % uint(r18));
	r13 = (r13 + 48)|0;
	r22 = r13 & 255;
	r23 = 57;
	r22 = uint(r22) > uint(r23) ? r4 : r16;
	r23 = (r20 + 1)|0;
	r13 = (r13 + r22)|0;
	r20 = (r14 - r20)|0;
	heap8[r20+-1] = r13;
	if(r19 <=r15) //_LBB801_115
{
break _198;
}
else{
	r9 = Math.floor(uint(r9) /uint(r18));
	r19 = (r19 + -1)|0;
	r20 = r23;
if(!(r9 !=0)) //_LBB801_113
{
break _198;
}
}
}
	r18 = (r23 + 122)|0;
	r9 = (r14 - r23)|0;
}
else{
	r4 = (r15 + r19)|0;
	r13 = 48;
	r9 = (r4 + 121)|0;
	r18 = 1;
	heap8[r4+121] = r13;
}
_204: do {
if(!(r9 ==r14)) //_LBB801_125
{
	if(uint(r9) <=uint(r14)) //_LBB801_122
{
if(!(r18 ==-1)) //_LBB801_125
{
	r4 = (r16 - r18)|0;
_209: while(true){
	r13 = r4;
	r19 = (r9 - r13)|0;
	r4 = (r13 + 1)|0;
	r20 = (r14 - r13)|0;
	r19 = heapU8[r19];
	heap8[r20] = r19;
if(!(r13 !=0)) //_LBB801_124
{
break _204;
}
}
}
}
else{
if(!(r18 ==-1)) //_LBB801_125
{
	r4 = (r9 + 1)|0;
	r9 = r18;
_213: while(true){
	heap8[r14] = r13;
	if(r9 ==0) //_LBB801_125
{
break _204;
}
else{
	r13 = heapU8[r4];
	r4 = (r4 + 1)|0;
	r9 = (r9 + -1)|0;
	r14 = (r14 + 1)|0;
}
}
}
}
}
} while(0);
	r4 = 1;
	r4 = r18 != r4;
	r4 = r4 & 1;
	r14 = r8 ^ 1;
	r4 = r4 | r14;
	r4 = r4 & 255;
	if(r4 !=0) //_LBB801_128
{
__label__ = 122;
}
else{
	r4 = heap32[(fp+-36)];
	r4 = heapU8[r4+r15];
	if(r4 !=48) //_LBB801_128
{
__label__ = 122;
}
else{
	r4 = r5 << 24;
	r5 = 0;
	r4 = r4 >> 24;
	r14 = r11 == r5;
	r4 = r4 > r5;
	r4 = r14 | r4;
	r4 = r4 != 0 ? r5 : r15;
__label__ = 123;
}
}
if (__label__ == 122){
	r4 = (r18 + r15)|0;
}
	r14 = r17 & 255;
	if(r14 ==2) //_LBB801_132
{
	r6 = heap32[(fp+-36)];
	r7 = (r6 + -1)|0;
	r4 = (r4 + 1)|0;
	r14 = 48;
	r16 = 45;
	heap32[(fp+-36)] = r7;
	heap8[r6+-1] = r16;
	r16 = r21;
}
else{
	if(r14 !=0) //_LBB801_133
{
	r14 = r7 | r6;
	r14 = r14 & 255;
if(!(r14 ==0)) //_LBB801_131
{
	r6 = heap32[(fp+-36)];
	r16 = (r6 + -1)|0;
	r7 = r7 & 255;
	r9 = 32;
	r13 = 43;
	r4 = (r4 + 1)|0;
	r14 = 48;
	r7 = r7 == 0 ? r9 : r13;
	heap32[(fp+-36)] = r16;
	heap8[r6+-1] = r7;
	r16 = r17;
break _194;
}
}
	r14 = 48;
}
}
} while(0);
	r6 = heap32[(fp+-36)];
	r7 = r11 | r10;
	if(r7 !=0) //_LBB801_77
{
	r7 = 0;
	r5 = r5 << 24;
	r5 = r5 >> 24;
	if(r5 <1) //_LBB801_79
{
	r9 = r16 & 255;
	r5 = r9 != r7;
	r5 = r5 & 1;
	if(r9 !=0) //_LBB801_81
{
__label__ = 75;
}
else{
__label__ = 76;
}
}
else{
__label__ = 75;
}
if (__label__ == 75){
	r4 = (r4 - r5)|0;
	r10 = (r10 - r5)|0;
	r9 = (r6 + r5)|0;
	heap32[(fp+-36)] = r9;
}
	r8 = r8 & 255;
	r9 = r8 != r7;
	r7 = r10 == r7;
	r7 = r9 & r7;
	r7 = r7 != 0 ? r11 : r10;
	r8 = r8 == 0 ? r4 : r11;
	r9 = r12 & 255;
if(!(r9 !=0)) //_LBB801_85
{
	r10 = r1 & 255;
if(!(r10 !=32)) //_LBB801_85
{
	r11 = sp + -8;
	r12 = (r7 - r8)|0;
	heap32[(g0)] = r11;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r12;
	heap32[(g0+3)] = r10;
	write_pad(i7);
	r10 = r_g0;
	if(r10 !=0) //_LBB801_210
{
__label__ = 198;
break _1;
}
}
}
if(!(r5 ==0)) //_LBB801_89
{
	if(r5 <0) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r10 = heap32[(fp+-2)];
	r11 = (r10 + r5)|0;
	if(uint(r11) <uint(r10)) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r10 = r2 >> 2;
	r11 = heap32[(r10+1)];
	r10 = heap32[(r10)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r5;
	heap32[(g0+2)] = r10;
	__FUNCTION_TABLE__[(r11)>>2](i7);
	r6 = heap32[(fp+-2)];
	r5 = (r6 + r5)|0;
	heap32[(fp+-2)] = r5;
}
}
}
if(!(r9 !=0)) //_LBB801_92
{
	r5 = r1 & 255;
if(!(r5 ==32)) //_LBB801_92
{
	r6 = sp + -8;
	r10 = (r7 - r8)|0;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r10;
	heap32[(g0+3)] = r5;
	write_pad(i7);
	r5 = r_g0;
	if(r5 !=0) //_LBB801_210
{
__label__ = 198;
break _1;
}
}
}
	r5 = sp + -8;
	r6 = (r8 - r4)|0;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r6;
	heap32[(g0+3)] = r14;
	write_pad(i7);
	r14 = r_g0;
	if(r14 !=0) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	if(r4 <0) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r14 = heap32[(fp+-2)];
	r6 = (r14 + r4)|0;
	if(uint(r6) <uint(r14)) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r14 = r2 >> 2;
	r6 = heap32[(r14+1)];
	r14 = heap32[(r14)];
	r10 = heap32[(fp+-36)];
	heap32[(g0)] = r10;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r14;
	__FUNCTION_TABLE__[(r6)>>2](i7);
	r14 = heap32[(fp+-2)];
	r4 = (r14 + r4)|0;
	heap32[(fp+-2)] = r4;
	if(r9 ==0) //_LBB801_207
{
continue _1;
}
else{
	r4 = (r7 - r8)|0;
	r14 = r1 & 255;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = r2;
	heap32[(g0+2)] = r4;
	heap32[(g0+3)] = r14;
	write_pad(i7);
	r4 = r_g0;
	if(r4 ==0) //_LBB801_207
{
continue _1;
}
else{
__label__ = 198;
break _1;
}
}
}
}
}
}
else{
	if(r4 <0) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r14 = heap32[(fp+-2)];
	r1 = (r14 + r4)|0;
	if(uint(r1) <uint(r14)) //_LBB801_210
{
__label__ = 198;
break _1;
}
else{
	r14 = r2 >> 2;
	r1 = heap32[(r14+1)];
	r14 = heap32[(r14)];
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r4;
	heap32[(g0+2)] = r14;
	__FUNCTION_TABLE__[(r1)>>2](i7);
	r14 = heap32[(fp+-2)];
	r4 = (r14 + r4)|0;
	heap32[(fp+-2)] = r4;
continue _1;
}
}
}
}
}
}
switch(__label__ ){//multiple entries
case 197:
	r0 = heap32[(fp+-2)];
	r_g0 = r0;
	return;
break;
case 198:
	r0 = -1;
	r_g0 = r0;
	return;
break;
}
}