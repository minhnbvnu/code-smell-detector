function _oggpack_writeinit($b) {
 $b = $b|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 ;HEAP32[$b>>2]=0|0;HEAP32[$b+4>>2]=0|0;HEAP32[$b+8>>2]=0|0;HEAP32[$b+12>>2]=0|0;
 $0 = (_malloc(256)|0);
 $1 = ((($b)) + 8|0);
 HEAP32[$1>>2] = $0;
 $2 = ((($b)) + 12|0);
 HEAP32[$2>>2] = $0;
 HEAP8[$0>>0] = 0;
 $3 = ((($b)) + 16|0);
 HEAP32[$3>>2] = 256;
 return;
}