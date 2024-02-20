function _ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EE5eraseENS_14__rw_tree_iterIS3_iPS3_RS3_NS_17__rw_rb_tree_nodeIS8_S3_SsS5_EEEESF_(sp)
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
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = heap32[(fp+2)];
	r1 = heap32[(fp+1)];
	r0 = r0 >> 2;
	r2 = r1 >> 2;
	r3 = heap32[(r2+4)];
	r4 = heap32[(r0)];
	r5 = heap32[(fp)];
	r6 = heap32[(fp+3)];
	r7 = r3 >> 2;
	r8 = heap32[(r7+2)];
if(!(r4 !=r8)) //_LBB863_3
{
if(!(r3 !=r6)) //_LBB863_3
{
	r8 = heap32[(r2+5)];
	if(r8 !=0) //_LBB863_4
{
	r0 = heap32[(r7+1)];
	heap32[(g0)] = r1;
	heap32[(g0+1)] = r0;
	_ZN4__rw9__rb_treeISsSt4pairIKSsiENS_11__select1stIS3_SsEESt4lessISsESaIS3_EE8_C_eraseEPNS_17__rw_rb_tree_nodeIS8_S3_SsS5_EE(i7);
	r0 = heap32[(r2+4)];
	r0 = r0 >> 2;
	heap32[(r0+1)] = 0;
	r0 = heap32[(r2+4)];
	r1 = r0 >> 2;
	heap32[(r1+3)] = r0;
	heap32[(r1+2)] = r0;
	heap32[(r2+5)] = 0;
	r0 = r5 >> 2;
	r1 = heap32[(r2+4)];
	heap32[(r0)] = r1;
	return;
}
}
}
	r1 = r5 >> 2;
	heap32[(r1)] = r3;
if(!(r4 ==r6)) //_LBB863_165
{
_7: while(true){
	r3 = r4 >> 2;
	r5 = heap32[(r3+3)];
	if(r5 !=0) //_LBB863_9
{
	r7 = r5 >> 2;
	r7 = heap32[(r7+2)];
if(!(r7 ==0)) //_LBB863_11
{
_12: while(true){
	r5 = r7;
	r7 = r5 >> 2;
	r7 = heap32[(r7+2)];
if(!(r7 !=0)) //_LBB863_12
{
break _12;
}
}
}
	heap32[(r0)] = r5;
}
else{
	r7 = heap32[(r3+1)];
	r5 = r7 >> 2;
	r5 = heap32[(r5+3)];
	if(r4 ==r5) //_LBB863_8
{
_17: while(true){
	r5 = r7;
	r8 = r5 >> 2;
	r7 = heap32[(r8+1)];
	r9 = r7 >> 2;
	r9 = heap32[(r9+3)];
if(!(r5 ==r9)) //_LBB863_14
{
break _17;
}
}
	heap32[(r0)] = r5;
	r8 = heap32[(r8+3)];
}
else{
	r8 = 0;
	r5 = r4;
}
	if(r8 !=r7) //_LBB863_18
{
	heap32[(r0)] = r7;
	r5 = r7;
}
}
	r7 = heap32[(r2+4)];
	if(r4 !=r7) //_LBB863_21
{
	r9 = heap32[(r3+3)];
_26: do {
	if(r9 !=0) //_LBB863_25
{
	r8 = r9 >> 2;
	r10 = heap32[(r8+2)];
	if(r10 ==0) //_LBB863_27
{
	r8 = r9;
}
else{
_30: while(true){
	r8 = r10;
	r10 = r8 >> 2;
	r10 = heap32[(r10+2)];
	if(r10 !=0) //_LBB863_28
{
continue _30;
}
else{
break _26;
}
}
}
}
else{
	r8 = heap32[(r3+1)];
	r10 = r8 >> 2;
	r10 = heap32[(r10+3)];
	if(r4 ==r10) //_LBB863_24
{
_34: while(true){
	r11 = r8;
	r10 = r11 >> 2;
	r8 = heap32[(r10+1)];
	r12 = r8 >> 2;
	r12 = heap32[(r12+3)];
if(!(r11 ==r12)) //_LBB863_30
{
break _34;
}
}
	r10 = heap32[(r10+3)];
}
else{
	r10 = 0;
	r11 = r4;
}
	if(r10 ==r8) //_LBB863_34
{
	r8 = r11;
}
}
} while(0);
	r10 = heap32[(r3+2)];
	if(r10 !=0) //_LBB863_37
{
	if(r9 !=0) //_LBB863_39
{
	r11 = r9 >> 2;
	r12 = heap32[(r11+2)];
_45: do {
	if(r12 ==0) //_LBB863_41
{
	r11 = r9;
}
else{
_47: while(true){
	r11 = r12;
	r12 = r11 >> 2;
	r12 = heap32[(r12+2)];
if(!(r12 !=0)) //_LBB863_42
{
break _45;
}
}
}
} while(0);
	r13 = r11 >> 2;
	r9 = heap32[(r13+3)];
	if(r11 !=r4) //_LBB863_45
{
	r7 = r10 >> 2;
	heap32[(r7+1)] = r11;
	r7 = heap32[(r3+2)];
	heap32[(r13+2)] = r7;
	r7 = heap32[(r3+3)];
	if(r7 !=r11) //_LBB863_47
{
	r12 = heap32[(r13+1)];
	if(r9 !=0) //_LBB863_49
{
	r7 = r9 >> 2;
	heap32[(r7+1)] = r12;
	r7 = heap32[(r13+1)];
}
else{
	r7 = r12;
}
	r7 = r7 >> 2;
	heap32[(r7+2)] = r9;
	r7 = heap32[(r3+3)];
	heap32[(r13+3)] = r7;
	r7 = heap32[(r3+3)];
	r7 = r7 >> 2;
	heap32[(r7+1)] = r11;
}
else{
	r12 = r11;
}
	r7 = heap32[(r2+4)];
	r7 = r7 >> 2;
	r10 = heap32[(r7+1)];
	if(r10 !=r4) //_LBB863_53
{
	r7 = heap32[(r3+1)];
	r10 = r7 >> 2;
	r10 = heap32[(r10+2)];
	r10 = r10 != r4;
	r10 = r10 & 1;
	r10 = r10 << 2;
	r7 = (r7 + r10)|0;
	r7 = (r7 + 8)|0;
	r10 = (r4 + 4)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r11;
}
else{
	r10 = (r4 + 4)|0;
	heap32[(r7+1)] = r11;
}
	r7 = r10 >> 2;
	r7 = heap32[(r7)];
	heap32[(r13+1)] = r7;
	r7 = heap32[(r13)];
	r11 = heap32[(r3)];
	heap32[(r13)] = r11;
	heap32[(r3)] = r7;
__label__ = 66;
}
else{
__label__ = 45;
}
}
else{
	r12 = heap32[(r3+1)];
	r11 = r4;
	r9 = r10;
__label__ = 47;
}
}
else{
	r11 = r4;
__label__ = 45;
}
if (__label__ == 45){
	r12 = r11 >> 2;
	r12 = heap32[(r12+1)];
	if(r9 ==0) //_LBB863_57
{
	r9 = 0;
__label__ = 48;
}
else{
__label__ = 47;
}
}
if (__label__ == 47){
	r7 = r9 >> 2;
	heap32[(r7+1)] = r12;
	r7 = heap32[(r2+4)];
__label__ = 48;
}
if (__label__ == 48){
	r7 = r7 >> 2;
	r10 = heap32[(r7+1)];
	if(r10 !=r4) //_LBB863_61
{
	r7 = heap32[(r3+1)];
	r10 = r7 >> 2;
	r10 = heap32[(r10+2)];
	r10 = r10 != r4;
	r10 = r10 & 1;
	r10 = r10 << 2;
	r7 = (r7 + r10)|0;
	r7 = (r7 + 8)|0;
	r7 = r7 >> 2;
	heap32[(r7)] = r9;
}
else{
	heap32[(r7+1)] = r9;
}
	r7 = heap32[(r2+4)];
	r7 = r7 >> 2;
	r10 = heap32[(r7+2)];
if(!(r10 !=r4)) //_LBB863_70
{
	r10 = heap32[(r3+3)];
	if(r10 !=0) //_LBB863_65
{
	r10 = r9 >> 2;
	r10 = heap32[(r10+2)];
_80: do {
	if(r10 ==0) //_LBB863_67
{
	r13 = r9;
}
else{
_82: while(true){
	r13 = r10;
	r10 = r13 >> 2;
	r10 = heap32[(r10+2)];
if(!(r10 !=0)) //_LBB863_68
{
break _80;
}
}
}
} while(0);
	heap32[(r7+2)] = r13;
}
else{
	r10 = heap32[(r3+1)];
	heap32[(r7+2)] = r10;
}
}
	r7 = heap32[(r2+4)];
	r7 = r7 >> 2;
	r10 = heap32[(r7+3)];
	if(r10 ==r4) //_LBB863_72
{
	r4 = heap32[(r3+2)];
	if(r4 !=0) //_LBB863_74
{
	r4 = r9 >> 2;
	r4 = heap32[(r4+3)];
_91: do {
	if(r4 ==0) //_LBB863_76
{
	r3 = r9;
}
else{
_93: while(true){
	r3 = r4;
	r4 = r3 >> 2;
	r4 = heap32[(r4+3)];
if(!(r4 !=0)) //_LBB863_77
{
break _91;
}
}
}
} while(0);
	heap32[(r7+3)] = r3;
	r4 = r11;
}
else{
	r4 = heap32[(r3+1)];
	heap32[(r7+3)] = r4;
	r4 = r11;
}
}
else{
	r4 = r11;
}
}
	r3 = r4 >> 2;
	r7 = heap32[(r3)];
_99: do {
if(!(r7 ==0)) //_LBB863_160
{
_100: while(true){
	r7 = heap32[(r2+4)];
	r7 = r7 >> 2;
	r7 = heap32[(r7+1)];
	if(r7 ==r9) //_LBB863_158
{
__label__ = 140;
break _100;
}
else{
if(!(r9 ==0)) //_LBB863_81
{
	r7 = r9 >> 2;
	r7 = heap32[(r7)];
if(!(r7 ==1)) //_LBB863_81
{
__label__ = 141;
break _100;
}
}
	r7 = r12 >> 2;
	r10 = heap32[(r7+2)];
	if(r10 !=r9) //_LBB863_119
{
	r11 = r10 >> 2;
	r13 = heap32[(r11)];
	if(r13 ==0) //_LBB863_121
{
	heap32[(r11)] = 1;
	heap32[(r7)] = 0;
	r10 = heap32[(r7+2)];
	r11 = r10 >> 2;
	r13 = heap32[(r11+3)];
	heap32[(r7+2)] = r13;
	r13 = heap32[(r11+3)];
if(!(r13 ==0)) //_LBB863_123
{
	r13 = r13 >> 2;
	heap32[(r13+1)] = r12;
}
	r13 = heap32[(r7+1)];
	heap32[(r11+1)] = r13;
	r13 = heap32[(r2+4)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+1)];
	if(r14 !=r12) //_LBB863_125
{
	r13 = heap32[(r7+1)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+3)];
	if(r14 !=r12) //_LBB863_127
{
	heap32[(r13+2)] = r10;
}
else{
	heap32[(r13+3)] = r10;
}
}
else{
	heap32[(r13+1)] = r10;
}
	heap32[(r11+3)] = r12;
	heap32[(r7+1)] = r10;
	r10 = heap32[(r7+2)];
}
	r11 = r10 >> 2;
	r13 = heap32[(r11+3)];
if(!(r13 ==0)) //_LBB863_131
{
	r13 = r13 >> 2;
	r14 = heap32[(r13)];
	if(r14 !=1) //_LBB863_135
{
__label__ = 117;
break _100;
}
}
	r13 = heap32[(r11+2)];
if(!(r13 ==0)) //_LBB863_134
{
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
if(!(r13 ==1)) //_LBB863_134
{
__label__ = 127;
break _100;
}
}
	heap32[(r11)] = 0;
}
else{
	r10 = heap32[(r7+3)];
	r11 = r10 >> 2;
	r13 = heap32[(r11)];
	if(r13 ==0) //_LBB863_84
{
	heap32[(r11)] = 1;
	heap32[(r7)] = 0;
	r10 = heap32[(r7+3)];
	r11 = r10 >> 2;
	r13 = heap32[(r11+2)];
	heap32[(r7+3)] = r13;
	r13 = heap32[(r11+2)];
if(!(r13 ==0)) //_LBB863_86
{
	r13 = r13 >> 2;
	heap32[(r13+1)] = r12;
}
	r13 = heap32[(r7+1)];
	heap32[(r11+1)] = r13;
	r13 = heap32[(r2+4)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+1)];
	if(r14 !=r12) //_LBB863_88
{
	r13 = heap32[(r7+1)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+2)];
	if(r14 !=r12) //_LBB863_90
{
	heap32[(r13+3)] = r10;
}
else{
	heap32[(r13+2)] = r10;
}
}
else{
	heap32[(r13+1)] = r10;
}
	heap32[(r11+2)] = r12;
	heap32[(r7+1)] = r10;
	r10 = heap32[(r7+3)];
}
	r11 = r10 >> 2;
	r13 = heap32[(r11+2)];
if(!(r13 ==0)) //_LBB863_94
{
	r13 = r13 >> 2;
	r14 = heap32[(r13)];
	if(r14 !=1) //_LBB863_99
{
__label__ = 83;
break _100;
}
}
	r13 = heap32[(r11+3)];
if(!(r13 ==0)) //_LBB863_97
{
	r13 = r13 >> 2;
	r13 = heap32[(r13)];
if(!(r13 ==1)) //_LBB863_97
{
__label__ = 93;
break _100;
}
}
	heap32[(r11)] = 0;
}
	r10 = heap32[(r7+1)];
	r9 = r12;
	r12 = r10;
}
}
_148: do {
switch(__label__ ){//multiple entries
case 117:
	r14 = heap32[(r11+2)];
if(!(r14 ==0)) //_LBB863_137
{
	r14 = r14 >> 2;
	r14 = heap32[(r14)];
	if(r14 !=1) //_LBB863_133
{
__label__ = 127;
break _148;
}
}
	heap32[(r13)] = 1;
	r13 = heap32[(r11+3)];
	r14 = r13 >> 2;
	heap32[(r11)] = 0;
	r15 = heap32[(r14+2)];
	heap32[(r11+3)] = r15;
	r15 = heap32[(r14+2)];
if(!(r15 ==0)) //_LBB863_139
{
	r15 = r15 >> 2;
	heap32[(r15+1)] = r10;
}
	r15 = heap32[(r11+1)];
	heap32[(r14+1)] = r15;
	r15 = heap32[(r2+4)];
	r15 = r15 >> 2;
	r16 = heap32[(r15+1)];
	if(r16 !=r10) //_LBB863_141
{
	r15 = heap32[(r11+1)];
	r15 = r15 >> 2;
	r16 = heap32[(r15+2)];
	if(r16 !=r10) //_LBB863_143
{
	heap32[(r15+3)] = r13;
}
else{
	heap32[(r15+2)] = r13;
}
}
else{
	heap32[(r15+1)] = r13;
}
	heap32[(r14+2)] = r10;
	heap32[(r11+1)] = r13;
	r10 = heap32[(r7+2)];
__label__ = 127;
break _148;
break;
case 83:
	r14 = heap32[(r11+3)];
if(!(r14 ==0)) //_LBB863_101
{
	r14 = r14 >> 2;
	r14 = heap32[(r14)];
	if(r14 !=1) //_LBB863_96
{
__label__ = 93;
break _148;
}
}
	heap32[(r13)] = 1;
	r13 = heap32[(r11+2)];
	r14 = r13 >> 2;
	heap32[(r11)] = 0;
	r15 = heap32[(r14+3)];
	heap32[(r11+2)] = r15;
	r15 = heap32[(r14+3)];
if(!(r15 ==0)) //_LBB863_103
{
	r15 = r15 >> 2;
	heap32[(r15+1)] = r10;
}
	r15 = heap32[(r11+1)];
	heap32[(r14+1)] = r15;
	r15 = heap32[(r2+4)];
	r15 = r15 >> 2;
	r16 = heap32[(r15+1)];
	if(r16 !=r10) //_LBB863_105
{
	r15 = heap32[(r11+1)];
	r15 = r15 >> 2;
	r16 = heap32[(r15+3)];
	if(r16 !=r10) //_LBB863_107
{
	heap32[(r15+2)] = r13;
}
else{
	heap32[(r15+3)] = r13;
}
}
else{
	heap32[(r15+1)] = r13;
}
	heap32[(r14+3)] = r10;
	heap32[(r11+1)] = r13;
	r10 = heap32[(r7+3)];
__label__ = 93;
break;
}
} while(0);
_177: do {
switch(__label__ ){//multiple entries
case 127:
	r10 = r10 >> 2;
	r11 = heap32[(r7)];
	heap32[(r10)] = r11;
	heap32[(r7)] = 1;
	r10 = heap32[(r10+2)];
if(!(r10 ==0)) //_LBB863_147
{
	r10 = r10 >> 2;
	heap32[(r10)] = 1;
}
	r10 = heap32[(r7+2)];
	r11 = r10 >> 2;
	r13 = heap32[(r11+3)];
	heap32[(r7+2)] = r13;
	r13 = heap32[(r11+3)];
if(!(r13 ==0)) //_LBB863_149
{
	r13 = r13 >> 2;
	heap32[(r13+1)] = r12;
}
	r13 = heap32[(r7+1)];
	heap32[(r11+1)] = r13;
	r13 = heap32[(r2+4)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+1)];
	if(r14 !=r12) //_LBB863_151
{
	r13 = heap32[(r7+1)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+3)];
	if(r14 !=r12) //_LBB863_153
{
	heap32[(r13+2)] = r10;
}
else{
	heap32[(r13+3)] = r10;
}
}
else{
	heap32[(r13+1)] = r10;
}
	heap32[(r11+3)] = r12;
	heap32[(r7+1)] = r10;
__label__ = 140;
break _177;
break;
case 93:
	r10 = r10 >> 2;
	r11 = heap32[(r7)];
	heap32[(r10)] = r11;
	heap32[(r7)] = 1;
	r10 = heap32[(r10+3)];
if(!(r10 ==0)) //_LBB863_111
{
	r10 = r10 >> 2;
	heap32[(r10)] = 1;
}
	r10 = heap32[(r7+3)];
	r11 = r10 >> 2;
	r13 = heap32[(r11+2)];
	heap32[(r7+3)] = r13;
	r13 = heap32[(r11+2)];
if(!(r13 ==0)) //_LBB863_113
{
	r13 = r13 >> 2;
	heap32[(r13+1)] = r12;
}
	r13 = heap32[(r7+1)];
	heap32[(r11+1)] = r13;
	r13 = heap32[(r2+4)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+1)];
	if(r14 !=r12) //_LBB863_115
{
	r13 = heap32[(r7+1)];
	r13 = r13 >> 2;
	r14 = heap32[(r13+2)];
	if(r14 !=r12) //_LBB863_117
{
	heap32[(r13+3)] = r10;
}
else{
	heap32[(r13+2)] = r10;
}
}
else{
	heap32[(r13+1)] = r10;
}
	heap32[(r11+2)] = r12;
	heap32[(r7+1)] = r10;
__label__ = 140;
break;
}
} while(0);
if (__label__ == 140){
	if(r9 ==0) //_LBB863_160
{
break _99;
}
}
	r7 = r9 >> 2;
	heap32[(r7)] = 1;
}
} while(0);
	r7 = heap32[(r2+1)];
	heap32[(r3+3)] = r7;
	r7 = heap32[(r3+4)];
	r7 = (r7 + -12)|0;
	r9 = _ZNSs11_C_null_refE;
if(!(r7 ==r9)) //_LBB863_163
{
	r7 = r7 >> 2;
	r9 = heap32[(r7)];
	r10 = (r9 + -1)|0;
	heap32[(r7)] = r10;
if(!(r9 >0)) //_LBB863_163
{
	r7 = heap32[(r3+4)];
	r7 = (r7 + -12)|0;
	heap32[(g0)] = r7;
	_ZdlPv(i7);
}
}
	heap32[(r3+4)] = 0;
	heap32[(r2+1)] = r4;
	r4 = heap32[(r2+5)];
	r4 = (r4 + -1)|0;
	heap32[(r2+5)] = r4;
}
else{
	r8 = r7;
}
	heap32[(r1)] = r8;
	r4 = r5;
	if(r5 !=r6) //_LBB863_5
{
continue _7;
}
else{
break _7;
}
}
}
	return;
}