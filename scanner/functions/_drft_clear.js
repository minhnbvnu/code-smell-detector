function _drft_clear($l) {
 $l = $l|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($l|0)==(0|0);
 if ($0) {
  return;
 }
 $1 = ((($l)) + 4|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ($2|0)==(0|0);
 if (!($3)) {
  _free($2);
 }
 $4 = ((($l)) + 8|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ($5|0)==(0|0);
 if (!($6)) {
  _free($5);
 }
 ;HEAP32[$l>>2]=0|0;HEAP32[$l+4>>2]=0|0;HEAP32[$l+8>>2]=0|0;
 return;
}