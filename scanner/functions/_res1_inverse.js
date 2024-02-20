function _res1_inverse($vb,$vl,$in,$nonzero,$ch) {
 $vb = $vb|0;
 $vl = $vl|0;
 $in = $in|0;
 $nonzero = $nonzero|0;
 $ch = $ch|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $i$01 = 0, $used$02 = 0, $used$1 = 0, $used$1$lcssa = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($ch|0)>(0);
 if ($0) {
  $i$01 = 0;$used$02 = 0;
 } else {
  return 0;
 }
 while(1) {
  $1 = (($nonzero) + ($i$01<<2)|0);
  $2 = HEAP32[$1>>2]|0;
  $3 = ($2|0)==(0);
  if ($3) {
   $used$1 = $used$02;
  } else {
   $4 = (($in) + ($i$01<<2)|0);
   $5 = HEAP32[$4>>2]|0;
   $6 = (($used$02) + 1)|0;
   $7 = (($in) + ($used$02<<2)|0);
   HEAP32[$7>>2] = $5;
   $used$1 = $6;
  }
  $8 = (($i$01) + 1)|0;
  $exitcond = ($8|0)==($ch|0);
  if ($exitcond) {
   $used$1$lcssa = $used$1;
   break;
  } else {
   $i$01 = $8;$used$02 = $used$1;
  }
 }
 $9 = ($used$1$lcssa|0)==(0);
 if ($9) {
  return 0;
 }
 __01inverse($vb,$vl,$in,$used$1$lcssa,3);
 return 0;
}