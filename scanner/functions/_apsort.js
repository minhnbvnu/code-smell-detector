function _apsort($a,$b) {
 $a = $a|0;
 $b = $b|0;
 var $0 = 0, $1 = 0.0, $2 = 0, $3 = 0.0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[$a>>2]|0;
 $1 = +HEAPF32[$0>>2];
 $2 = HEAP32[$b>>2]|0;
 $3 = +HEAPF32[$2>>2];
 $4 = $1 < $3;
 $5 = $4&1;
 $6 = $1 > $3;
 $7 = $6&1;
 $8 = (($5) - ($7))|0;
 return ($8|0);
}