function sscanf(sp)
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
	var f0;
	var f1;
	var f2;
	var f3;
var __label__ = 0;
	i7 = sp + -40;var g0 = i7>>2; // save stack
	r0 = (sp + 4)|0;
	r1 = heap32[(fp)];
	heap32[(fp+-5)] = r0;
	heap32[(fp+-4)] = r1;
	heap32[(fp+-1)] = r0;
	r0 = sp + -16;
	heap32[(g0)] = r0;
	r1 = 1;
	r2 = 0;
	r3 = _2E_str7136;
	sgetc(i7);
	r4 = r_g0;
	f3 =                        10;
	r20 = 255;
_1: while(true){
	r5 = heapU8[r3];
	if(r5 !=0) //_LBB800_1
{
	r5 = r5 << 24;
	r5 = r5 >> 24;
	r6 = (r3 + 1)|0;
	if(r5 >31) //_LBB800_4
{
	if(r5 ==32) //_LBB800_7
{
__label__ = 7;
}
else{
	if(r5 ==37) //_LBB800_8
{
	r5 = -1;
	r7 = 0;
	r8 = r7;
	r9 = r7;
	r10 = r7;
	r11 = r7;
_8: while(true){
	r12 = heap8[r6];
if(!(r12 ==110)) //_LBB800_17
{
	if(r4 ==-1) //_LBB800_187
{
__label__ = 168;
break _1;
}
}
	if(r12 >103) //_LBB800_31
{
	if(r12 >111) //_LBB800_38
{
	if(r12 >114) //_LBB800_41
{
__label__ = 40;
break _8;
}
else{
	if(r12 ==112) //_LBB800_59
{
__label__ = 52;
break _8;
}
else{
if(!(r12 ==113)) //_LBB800_45
{
__label__ = 168;
break _1;
}
}
}
}
else{
	if(r12 >107) //_LBB800_35
{
	if(r12 ==108) //_LBB800_55
{
	r3 = 1;
	r10 = r10 & 255;
	r11 = r10 == 0 ? r11 : r3;
	r6 = (r6 + 1)|0;
	r10 = r3;
continue _8;
}
else{
__label__ = 35;
break _8;
}
}
else{
	if(r12 ==104) //_LBB800_53
{
	r6 = (r6 + 1)|0;
	r9 = 1;
continue _8;
}
else{
__label__ = 33;
break _8;
}
}
}
}
else{
	if(r12 >75) //_LBB800_25
{
	if(r12 >98) //_LBB800_28
{
__label__ = 27;
break _8;
}
else{
if(!(r12 ==76)) //_LBB800_45
{
__label__ = 26;
break _8;
}
}
}
else{
	if(r12 >41) //_LBB800_22
{
	if(r12 ==42) //_LBB800_46
{
	r6 = (r6 + 1)|0;
	r8 = 1;
continue _8;
}
else{
	r5 = (r12 + -48)|0;
	if(uint(r5) <uint(10)) //_LBB800_57
{
	r5 = sp + -8;
	heap32[(g0)] = r6;
	heap32[(g0+1)] = r5;
	strtol(i7);
	r5 = r_g0;
	r6 = heap32[(fp+-2)];
	r7 = 1;
continue _8;
}
else{
__label__ = 23;
break _8;
}
}
}
else{
__label__ = 19;
break _8;
}
}
}
	r6 = (r6 + 1)|0;
	r11 = 1;
}
_36: do {
switch(__label__ ){//multiple entries
case 40:
	if(r12 ==115) //_LBB800_165
{
	r8 = r8 & 255;
if(!(r8 !=0)) //_LBB800_167
{
	r3 = sp + -4;
	heap32[(g0)] = r3;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r3 = r_g0 >> 2;
	r3 = heap32[(r3)];
	heap32[(fp+-2)] = r3;
}
	r3 = (r6 + 1)|0;
	r6 = r4 << 2;
	r7 = my_ctype;
	r6 = (r6 + r7)|0;
	r6 = heapU8[r6+4];
	r6 = r6 & 8;
_43: do {
	if(r6 ==0) //_LBB800_169
{
	r6 = r4;
}
else{
_45: while(true){
	heap32[(g0)] = r0;
	sgetc(i7);
	r6 = r_g0;
	r4 = r6 << 2;
	r4 = (r4 + r7)|0;
	r1 = (r1 + 1)|0;
	r4 = heapU8[r4+4];
	r4 = r4 & 8;
if(!(r4 !=0)) //_LBB800_170
{
break _43;
}
}
}
} while(0);
	r4 = -1;
	if(r6 ==-1) //_LBB800_186
{
continue _1;
}
else{
	r4 = r6;
_49: while(true){
	if(r4 ==-1) //_LBB800_180
{
break _49;
}
else{
	if(r5 ==0) //_LBB800_180
{
break _49;
}
else{
	r6 = r4 << 2;
	r6 = (r6 + r7)|0;
	r6 = heapU8[r6+4];
	r6 = r6 & 8;
	if(r6 ==0) //_LBB800_173
{
if(!(r8 !=0)) //_LBB800_175
{
	r6 = heap32[(fp+-2)];
	heap8[r6] = r4;
}
	if(r4 ==0) //_LBB800_180
{
break _49;
}
else{
	r4 = heap32[(fp+-2)];
	r4 = (r4 + 1)|0;
	heap32[(fp+-2)] = r4;
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	r5 = (r5 + -1)|0;
	sgetc(i7);
	r4 = r_g0;
}
}
else{
break _49;
}
}
}
}
	if(r8 !=0) //_LBB800_186
{
continue _1;
}
else{
	r2 = (r2 + 1)|0;
	r5 = heap32[(fp+-2)];
	r6 = 0;
	heap8[r5] = r6;
continue _1;
}
}
}
else{
	if(r12 ==117) //_LBB800_60
{
__label__ = 53;
break _36;
}
else{
	if(r12 ==120) //_LBB800_59
{
__label__ = 52;
break _36;
}
else{
__label__ = 168;
break _1;
}
}
}
break;
case 35:
	if(r12 ==110) //_LBB800_182
{
	r3 = (r6 + 1)|0;
	r5 = r8 & 255;
	if(r5 !=0) //_LBB800_186
{
continue _1;
}
else{
	r5 = sp + -4;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r5 = r_g0 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	r6 = (r1 + -1)|0;
	heap32[(r5)] = r6;
continue _1;
}
}
else{
	if(r12 ==111) //_LBB800_44
{
	r13 = 8;
__label__ = 55;
break _36;
}
else{
__label__ = 168;
break _1;
}
}
break;
case 33:
	if(r12 ==105) //_LBB800_60
{
__label__ = 53;
break _36;
}
else{
__label__ = 168;
break _1;
}
break;
case 27:
	if(r12 ==99) //_LBB800_155
{
	r3 = (r6 + 1)|0;
	r6 = r8 & 255;
	if(r6 ==0) //_LBB800_157
{
	r8 = sp + -4;
	heap32[(g0)] = r8;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r8 = r_g0 >> 2;
	r8 = heap32[(r8)];
	r2 = (r2 + 1)|0;
	heap32[(fp+-2)] = r8;
}
	r8 = r7 & 255;
	r7 = 1;
	r5 = r8 == 0 ? r7 : r5;
	if(r5 ==0) //_LBB800_186
{
continue _1;
}
else{
	if(r4 ==-1) //_LBB800_186
{
continue _1;
}
else{
	r5 = (r5 + -1)|0;
_77: while(true){
if(!(r6 !=0)) //_LBB800_163
{
	r8 = heap32[(fp+-2)];
	r7 = (r8 + 1)|0;
	heap8[r8] = r4;
	heap32[(fp+-2)] = r7;
}
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	sgetc(i7);
	r4 = r_g0;
	if(r5 ==0) //_LBB800_186
{
continue _1;
}
else{
	r5 = (r5 + -1)|0;
	if(r4 !=-1) //_LBB800_161
{
continue _77;
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
	if(r12 ==100) //_LBB800_61
{
	r13 = 10;
__label__ = 55;
break _36;
}
else{
	r5 = (r12 + -101)|0;
	if(uint(r5) <uint(3)) //_LBB800_48
{
__label__ = 46;
break _36;
}
else{
__label__ = 168;
break _1;
}
}
}
break;
case 26:
	if(r12 ==88) //_LBB800_59
{
__label__ = 52;
break _36;
}
else{
__label__ = 168;
break _1;
}
break;
case 23:
	if(r12 ==69) //_LBB800_48
{
__label__ = 46;
break _36;
}
else{
__label__ = 168;
break _1;
}
break;
case 19:
	if(r12 ==0) //_LBB800_6
{
__label__ = 6;
break _1;
}
else{
	if(r12 ==37) //_LBB800_51
{
	r5 = r4 & 255;
	if(r5 !=r12) //_LBB800_187
{
__label__ = 168;
break _1;
}
else{
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	r3 = (r6 + 1)|0;
	sgetc(i7);
	r4 = r_g0;
continue _1;
}
}
else{
__label__ = 168;
break _1;
}
}
break;
}
} while(0);
switch(__label__ ){//multiple entries
case 53:
	r13 = 0;
break;
case 52:
	r13 = 16;
break;
case 46:
	r5 = r4 << 2;
	r7 = my_ctype;
	r5 = (r5 + r7)|0;
	r5 = heapU8[r5+4];
	r3 = (r6 + 1)|0;
	r5 = r5 & 8;
_97: do {
if(!(r5 ==0)) //_LBB800_50
{
_98: while(true){
	heap32[(g0)] = r0;
	sgetc(i7);
	r4 = r_g0;
	r5 = r4 << 2;
	r5 = (r5 + r7)|0;
	r1 = (r1 + 1)|0;
	r5 = heapU8[r5+4];
	r5 = r5 & 8;
if(!(r5 !=0)) //_LBB800_111
{
break _97;
}
}
}
} while(0);
	if(r4 ==45) //_LBB800_114
{
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	r5 = 1;
	sgetc(i7);
	r4 = r_g0;
}
else{
	r5 = 0;
}
	if(r4 ==43) //_LBB800_117
{
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	sgetc(i7);
	r4 = r_g0;
}
	r6 = (r4 + -48)|0;
_108: do {
	if(uint(r6) >uint(9)) //_LBB800_120
{
	f0 =                         0;
	r6 = r1;
}
else{
	f0 =                         0;
	r6 = r1;
_111: while(true){
	r4 = (r4 + -48)|0;
	f1 =                        10;
	heap32[(g0)] = r0;
	f0 = f0*f1;
	f1 = r4; //fitod r4, f1
	sgetc(i7);
	r4 = r_g0;
	f0 = f0+f1;
	r6 = (r6 + 1)|0;
	r7 = (r4 + -48)|0;
if(!(uint(r7) <uint(10))) //_LBB800_121
{
break _108;
}
}
}
} while(0);
_114: do {
	if(r4 ==46) //_LBB800_124
{
	heap32[(g0)] = r0;
	sgetc(i7);
	r4 = r_g0;
	r1 = (r1 + 1)|0;
	r7 = (r4 + -48)|0;
	if(uint(r7) <uint(10)) //_LBB800_126
{
	r6 = (r6 + 1)|0;
	f1 =       0.10000000000000001;
_118: while(true){
	r4 = (r4 + -48)|0;
	f2 = r4; //fitod r4, f2
	heap32[(g0)] = r0;
	f2 = f2*f1;
	sgetc(i7);
	r4 = r_g0;
	f0 = f2+f0;
	f1 = f1/f3;
	r6 = (r6 + 1)|0;
	r7 = (r4 + -48)|0;
if(!(uint(r7) <uint(10))) //_LBB800_127
{
break _114;
}
}
}
else{
	r6 = (r6 + 1)|0;
}
}
} while(0);
	if(r1 ==r6) //_LBB800_73
{
__label__ = 172;
break _1;
}
else{
	r1 = r4 | 32;
_123: do {
	if(r1 ==101) //_LBB800_131
{
	heap32[(g0)] = r0;
	sgetc(i7);
	r1 = r_g0;
	if(r1 ==45) //_LBB800_135
{
	heap32[(g0)] = r0;
	f1 =       0.10000000000000001;
	sgetc(i7);
	r4 = r_g0;
}
else{
	if(r1 ==43) //_LBB800_136
{
	heap32[(g0)] = r0;
	f1 =                        10;
	sgetc(i7);
	r4 = r_g0;
}
else{
	if(r1 !=-1) //_LBB800_137
{
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	f0 =                         0;
	sputc(i7);
	r1 = r6;
break _123;
}
else{
	r1 = (r6 + 1)|0;
	f0 =                         0;
break _123;
}
}
}
	r7 = (r6 + 2)|0;
	r1 = (r4 + -48)|0;
_135: do {
	if(uint(r1) <uint(10)) //_LBB800_140
{
	r1 = (r6 + 2)|0;
	r6 = 0;
_137: while(true){
	r6 = (r6 * 10)|0;
	heap32[(g0)] = r0;
	r6 = (r4 + r6)|0;
	sgetc(i7);
	r4 = r_g0;
	r6 = (r6 + -48)|0;
	r1 = (r1 + 1)|0;
	r9 = (r4 + -48)|0;
if(!(uint(r9) <uint(10))) //_LBB800_141
{
break _135;
}
}
}
else{
	r6 = 0;
	r1 = r7;
}
} while(0);
	if(r7 ==r1) //_LBB800_73
{
__label__ = 172;
break _1;
}
else{
if(!(r6 ==0)) //_LBB800_145
{
__label__ = 130; //SET chanka
_142: while(true){
	r6 = (r6 + -1)|0;
	f0 = f0*f1;
if(!(r6 !=0)) //_LBB800_146
{
break _123;
}
}
}
}
}
else{
	r1 = r6;
}
} while(0);
	if(r5 !=0) //_LBB800_149
{
	f0 = -f0;
}
	r5 = r8 & 255;
	if(r5 !=0) //_LBB800_186
{
continue _1;
}
else{
	r5 = sp + -4;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r5 = r_g0;
	r6 = r10 & 255;
	if(r6 ==0) //_LBB800_153
{
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	f0 = f0; //fdtos f0, f0
	heapFloat[(r5)] = f0;
}
else{
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	llvm_writeDouble((r5),f0);
}
	r2 = (r2 + 1)|0;
continue _1;
}
}
break;
}
	r3 = r4 << 2;
	r14 = my_ctype;
	r3 = (r3 + r14)|0;
	r15 = heapU8[r3+4];
	r3 = (r6 + 1)|0;
	r6 = r15 & 8;
_155: do {
if(!(r6 ==0)) //_LBB800_64
{
_156: while(true){
	heap32[(g0)] = r0;
	sgetc(i7);
	r4 = r_g0;
	r6 = r4 << 2;
	r6 = (r6 + r14)|0;
	r1 = (r1 + 1)|0;
	r6 = heapU8[r6+4];
	r6 = r6 & 8;
if(!(r6 !=0)) //_LBB800_65
{
break _155;
}
}
}
} while(0);
	if(r4 ==45) //_LBB800_68
{
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	r6 = 1;
	sgetc(i7);
	r4 = r_g0;
}
else{
	r6 = 0;
}
	if(r4 ==43) //_LBB800_71
{
	heap32[(g0)] = r0;
	r14 = (r1 + 1)|0;
	sgetc(i7);
	r4 = r_g0;
}
else{
	r14 = r1;
}
	if(r4 !=-1) //_LBB800_74
{
	r7 = r7 & 255;
_168: do {
	if(r7 ==0) //_LBB800_76
{
	if(r13 !=16) //_LBB800_79
{
__label__ = 68;
}
else{
	if(r4 !=48) //_LBB800_79
{
__label__ = 68;
}
else{
__label__ = 72;
}
}
_172: do {
if (__label__ == 68){
if(!(r13 !=0)) //_LBB800_82
{
	r7 = 48;
	r7 = r4 != r7;
if(!(r7 != 0)) //_LBB800_82
{
	r13 = 8;
break _172;
}
}
	r7 = 10;
	r13 = r13 != 0 ? r13 : r7;
	r1 = r14;
break _168;
}
} while(0);
	heap32[(g0)] = r0;
	sgetc(i7);
	r4 = r_g0;
	r7 = r4 | 32;
	if(r7 ==120) //_LBB800_85
{
	heap32[(g0)] = r0;
	r1 = (r14 + 2)|0;
	r13 = 16;
	sgetc(i7);
	r4 = r_g0;
}
else{
	r1 = (r14 + 1)|0;
}
}
else{
	r1 = r14;
}
} while(0);
	r7 = 0;
	r15 = r7;
	r16 = r7;
_184: while(true){
	if(r5 ==0) //_LBB800_97
{
break _184;
}
else{
	if(r4 !=-1) //_LBB800_87
{
	r17 = r4 & 255;
	r18 = r17 | 32;
	if(uint(r18) <uint(97)) //_LBB800_89
{
	r18 = 58;
	r19 = (r17 + -48)|0;
	r17 = uint(r17) < uint(r18) ? r19 : r20;
}
else{
	r17 = (r18 + -87)|0;
}
	if(uint(r17) >=uint(r13)) //_LBB800_97
{
break _184;
}
else{
	heap32[(g0)] = r15;
	heap32[(g0+1)] = r16;
	heap32[(g0+2)] = r13;
	heap32[(g0+3)] = r7;
	__muldi3(i7);
	r4 = r_g0;
	r18 = r_g1;
	r15 = uint(r4) >= uint(r15);
	r19 = uint(r18) >= uint(r16);
	r15 = r18 == r16 ? r15 : r19;
	if(r15 != 0) //_LBB800_93
{
	r15 = (r17 + r4)|0;
	r16 = 1;
	r17 = uint(r15) < uint(r17) ? r16 : r7;
	r4 = uint(r15) < uint(r4) ? r16 : r17;
	r16 = (r18 + r4)|0;
}
else{
	r15 = -1;
	r16 = r15;
}
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	r5 = (r5 + -1)|0;
	sgetc(i7);
	r4 = r_g0;
}
}
else{
break _184;
}
}
}
	if(r14 ==r1) //_LBB800_73
{
__label__ = 172;
break _1;
}
else{
	r5 = r12 | 32;
if(!(uint(r5) >uint(111))) //_LBB800_100
{
	if(r16 >-1) //_LBB800_101
{
	r5 = 1;
	r12 = (r7 - r16)|0;
	r5 = r15 != 0 ? r5 : r7;
	r7 = (r7 - r15)|0;
	r5 = (r12 - r5)|0;
	r15 = r6 != 0 ? r7 : r15;
	r16 = r6 != 0 ? r5 : r16;
}
}
	r5 = r8 & 255;
	if(r5 !=0) //_LBB800_186
{
continue _1;
}
else{
	r5 = r11 & 255;
	if(r5 ==0) //_LBB800_105
{
	r5 = r10 & 255;
	if(r5 ==0) //_LBB800_107
{
	r5 = sp + -4;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r5 = r_g0;
	r7 = r9 & 255;
	if(r7 ==0) //_LBB800_109
{
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	heap32[(r5)] = r15;
}
else{
	r5 = r5 >> 2;
	r5 = heap32[(r5)];
	heap16[(r5)>>1] = r15;
}
}
else{
	r5 = sp + -4;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r5 = r_g0 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	heap32[(r5)] = r15;
}
}
else{
	r5 = sp + -4;
	heap32[(g0)] = r5;
	heap32[(g0+1)] = 4;
	my_arg_test(i7);
	r5 = r_g0 >> 2;
	r5 = heap32[(r5)];
	r5 = r5 >> 2;
	heap32[(r5)] = r15;
	heap32[(r5+1)] = r16;
}
	r5 = uint(r14) < uint(r1);
	r5 = r5 & 1;
	r2 = (r5 + r2)|0;
continue _1;
}
}
}
else{
__label__ = 172;
break _1;
}
}
else{
__label__ = 165;
}
}
}
else{
	if(r5 ==0) //_LBB800_6
{
__label__ = 6;
break _1;
}
else{
	r7 = (r5 + -9)|0;
	if(uint(r7) <uint(5)) //_LBB800_7
{
__label__ = 7;
}
else{
__label__ = 165;
}
}
}
switch(__label__ ){//multiple entries
case 7:
	r3 = (r3 + 1)|0;
_218: while(true){
	r5 = heapU8[r3];
	if(r5 ==0) //_LBB800_13
{
break _218;
}
else{
	r5 = r5 << 24;
	r5 = r5 >> 24;
	r5 = r5 << 2;
	r6 = my_ctype;
	r5 = (r5 + r6)|0;
	r5 = heapU8[r5+4];
	r5 = r5 & 8;
	if(r5 ==0) //_LBB800_13
{
break _218;
}
else{
	r3 = (r3 + 1)|0;
}
}
}
	r6 = r4 << 2;
	r5 = my_ctype;
	r6 = (r6 + r5)|0;
	r6 = heapU8[r6+4];
	r6 = r6 & 8;
	if(r6 ==0) //_LBB800_186
{
continue _1;
}
else{
__label__ = 12; //SET chanka
_223: while(true){
	heap32[(g0)] = r0;
	sgetc(i7);
	r4 = r_g0;
	r6 = r4 << 2;
	r6 = (r6 + r5)|0;
	r1 = (r1 + 1)|0;
	r6 = heapU8[r6+4];
	r6 = r6 & 8;
	if(r6 ==0) //_LBB800_186
{
continue _1;
}
}
}
break;
case 165:
	r3 = r4 & 255;
	if(r3 !=r5) //_LBB800_187
{
__label__ = 168;
break _1;
}
else{
	heap32[(g0)] = r0;
	r1 = (r1 + 1)|0;
	sgetc(i7);
	r4 = r_g0;
	r3 = r6;
continue _1;
}
break;
}
}
else{
__label__ = 168;
break _1;
}
}
_227: do {
switch(__label__ ){//multiple entries
case 168:
if(!(r4 >-1)) //_LBB800_190
{
if(!(r2 !=0)) //_LBB800_190
{
	r2 = -1;
break _227;
}
}
	heap32[(g0)] = r4;
	heap32[(g0+1)] = r0;
	sputc(i7);
break;
case 6:
	r2 = 0;
break;
}
} while(0);
	r_g0 = r2;
	return;
}