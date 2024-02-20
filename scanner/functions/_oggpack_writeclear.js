function _oggpack_writeclear($b) {
 $b = $b|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($b)) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0|0);
 if (!($2)) {
  _free($1);
 }
 ;HEAP32[$b>>2]=0|0;HEAP32[$b+4>>2]=0|0;HEAP32[$b+8>>2]=0|0;HEAP32[$b+12>>2]=0|0;HEAP32[$b+16>>2]=0|0;
 return;
}