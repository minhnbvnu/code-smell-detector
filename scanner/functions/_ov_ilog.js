function _ov_ilog($v) {
 $v = $v|0;
 var $$01 = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $ret$0$lcssa = 0, $ret$02 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($v|0)==(0);
 if ($0) {
  $ret$0$lcssa = 0;
 } else {
  $$01 = $v;$ret$02 = 0;
  while(1) {
   $1 = $$01 >>> 1;
   $2 = (($ret$02) + 1)|0;
   $3 = ($1|0)==(0);
   if ($3) {
    $ret$0$lcssa = $2;
    break;
   } else {
    $$01 = $1;$ret$02 = $2;
   }
  }
 }
 return ($ret$0$lcssa|0);
}