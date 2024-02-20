function _vorbis_lpc_predict($coeff,$prime,$m,$data,$n) {
 $coeff = $coeff|0;
 $prime = $prime|0;
 $m = $m|0;
 $data = $data|0;
 $n = $n|0;
 var $$alloca_mul = 0, $$lcssa = 0.0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0.0, $16 = 0, $17 = 0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0.0, $3 = 0, $4 = 0, $5 = 0, $6 = 0;
 var $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $exitcond19 = 0, $i$210$us = 0, $indvars$iv = 0, $indvars$iv$next = 0, $o$06$us = 0, $p$07$us = 0, $y$08$us = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (($n) + ($m))|0;
 $1 = $0 << 2;
 $$alloca_mul = $1;
 $2 = STACKTOP; STACKTOP = STACKTOP + ((((1*$$alloca_mul)|0)+15)&-16)|0;;
 $3 = ($prime|0)==(0|0);
 $4 = ($m|0)>(0);
 if ($3) {
  if ($4) {
   $6 = $m << 2;
   _memset(($2|0),0,($6|0))|0;
  }
 } else {
  if ($4) {
   $5 = $m << 2;
   _memcpy(($2|0),($prime|0),($5|0))|0;
  }
 }
 $7 = ($n|0)>(0);
 if (!($7)) {
  STACKTOP = sp;return;
 }
 $8 = ($m|0)>(0);
 if ($8) {
  $i$210$us = 0;$indvars$iv = $m;
 } else {
  $9 = $n << 2;
  _memset(($2|0),0,($9|0))|0;
  _memset(($data|0),0,($9|0))|0;
  STACKTOP = sp;return;
 }
 while(1) {
  $o$06$us = $i$210$us;$p$07$us = $m;$y$08$us = 0.0;
  while(1) {
   $13 = (($o$06$us) + 1)|0;
   $14 = (($2) + ($o$06$us<<2)|0);
   $15 = +HEAPF32[$14>>2];
   $16 = (($p$07$us) + -1)|0;
   $17 = (($coeff) + ($16<<2)|0);
   $18 = +HEAPF32[$17>>2];
   $19 = $18 * $15;
   $20 = $y$08$us - $19;
   $exitcond = ($13|0)==($indvars$iv|0);
   if ($exitcond) {
    $$lcssa = $20;
    break;
   } else {
    $o$06$us = $13;$p$07$us = $16;$y$08$us = $20;
   }
  }
  $10 = (($2) + ($indvars$iv<<2)|0);
  HEAPF32[$10>>2] = $$lcssa;
  $11 = (($data) + ($i$210$us<<2)|0);
  HEAPF32[$11>>2] = $$lcssa;
  $12 = (($i$210$us) + 1)|0;
  $indvars$iv$next = (($indvars$iv) + 1)|0;
  $exitcond19 = ($12|0)==($n|0);
  if ($exitcond19) {
   break;
  } else {
   $i$210$us = $12;$indvars$iv = $indvars$iv$next;
  }
 }
 STACKTOP = sp;return;
}