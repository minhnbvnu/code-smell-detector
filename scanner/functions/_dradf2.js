function _dradf2($ido,$l1,$cc,$ch,$wa1) {
 $ido = $ido|0;
 $l1 = $l1|0;
 $cc = $cc|0;
 $ch = $ch|0;
 $wa1 = $wa1|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0.0, $31 = 0, $32 = 0, $33 = 0.0, $34 = 0.0, $35 = 0, $36 = 0, $37 = 0.0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0.0;
 var $45 = 0, $46 = 0.0, $47 = 0.0, $48 = 0, $49 = 0.0, $5 = 0.0, $50 = 0.0, $51 = 0, $52 = 0, $53 = 0, $54 = 0.0, $55 = 0.0, $56 = 0, $57 = 0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0.0, $70 = 0, $71 = 0.0, $72 = 0.0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0.0, $80 = 0;
 var $81 = 0, $9 = 0, $exitcond = 0, $exitcond23 = 0, $exitcond24 = 0, $i$05$us = 0, $k$016 = 0, $k$111$us = 0, $k$21 = 0, $t1$017 = 0, $t1$112$us = 0, $t1$22 = 0, $t2$018 = 0, $t2$113$us = 0, $t2$23 = 0, $t3$06$us = 0, $t3$14 = 0, $t4$07$us = 0, $t5$08$us = 0, $t6$09$us = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $0 = Math_imul($l1, $ido)|0;
 $1 = $ido << 1;
 $2 = ($l1|0)>(0);
 if ($2) {
  $3 = (($1) + -1)|0;
  $k$016 = 0;$t1$017 = 0;$t2$018 = $0;
  while(1) {
   $4 = (($cc) + ($t1$017<<2)|0);
   $5 = +HEAPF32[$4>>2];
   $6 = (($cc) + ($t2$018<<2)|0);
   $7 = +HEAPF32[$6>>2];
   $8 = $7 + $5;
   $9 = $t1$017 << 1;
   $10 = (($ch) + ($9<<2)|0);
   HEAPF32[$10>>2] = $8;
   $11 = +HEAPF32[$4>>2];
   $12 = +HEAPF32[$6>>2];
   $13 = $11 - $12;
   $14 = (($3) + ($9))|0;
   $15 = (($ch) + ($14<<2)|0);
   HEAPF32[$15>>2] = $13;
   $16 = (($t1$017) + ($ido))|0;
   $17 = (($t2$018) + ($ido))|0;
   $18 = (($k$016) + 1)|0;
   $exitcond23 = ($18|0)==($l1|0);
   if ($exitcond23) {
    break;
   } else {
    $k$016 = $18;$t1$017 = $16;$t2$018 = $17;
   }
  }
 }
 $19 = ($ido|0)<(2);
 if ($19) {
  return;
 }
 $20 = ($ido|0)==(2);
 if (!($20)) {
  if ($2) {
   $k$111$us = 0;$t1$112$us = 0;$t2$113$us = $0;
   while(1) {
    $64 = $t1$112$us << 1;
    $65 = (($64) + ($1))|0;
    $i$05$us = 2;$t3$06$us = $t2$113$us;$t4$07$us = $65;$t5$08$us = $t1$112$us;$t6$09$us = $64;
    while(1) {
     $24 = (($t3$06$us) + 2)|0;
     $25 = (($t4$07$us) + -2)|0;
     $26 = (($t5$08$us) + 2)|0;
     $27 = (($t6$09$us) + 2)|0;
     $28 = (($i$05$us) + -2)|0;
     $29 = (($wa1) + ($28<<2)|0);
     $30 = +HEAPF32[$29>>2];
     $31 = (($t3$06$us) + 1)|0;
     $32 = (($cc) + ($31<<2)|0);
     $33 = +HEAPF32[$32>>2];
     $34 = $33 * $30;
     $35 = (($i$05$us) + -1)|0;
     $36 = (($wa1) + ($35<<2)|0);
     $37 = +HEAPF32[$36>>2];
     $38 = (($cc) + ($24<<2)|0);
     $39 = +HEAPF32[$38>>2];
     $40 = $39 * $37;
     $41 = $40 + $34;
     $42 = $39 * $30;
     $43 = $37 * $33;
     $44 = $42 - $43;
     $45 = (($cc) + ($26<<2)|0);
     $46 = +HEAPF32[$45>>2];
     $47 = $44 + $46;
     $48 = (($ch) + ($27<<2)|0);
     HEAPF32[$48>>2] = $47;
     $49 = +HEAPF32[$45>>2];
     $50 = $44 - $49;
     $51 = (($ch) + ($25<<2)|0);
     HEAPF32[$51>>2] = $50;
     $52 = (($t5$08$us) + 1)|0;
     $53 = (($cc) + ($52<<2)|0);
     $54 = +HEAPF32[$53>>2];
     $55 = $54 + $41;
     $56 = $t6$09$us | 1;
     $57 = (($ch) + ($56<<2)|0);
     HEAPF32[$57>>2] = $55;
     $58 = +HEAPF32[$53>>2];
     $59 = $58 - $41;
     $60 = (($t4$07$us) + -3)|0;
     $61 = (($ch) + ($60<<2)|0);
     HEAPF32[$61>>2] = $59;
     $62 = (($i$05$us) + 2)|0;
     $63 = ($62|0)<($ido|0);
     if ($63) {
      $i$05$us = $62;$t3$06$us = $24;$t4$07$us = $25;$t5$08$us = $26;$t6$09$us = $27;
     } else {
      break;
     }
    }
    $21 = (($t1$112$us) + ($ido))|0;
    $22 = (($t2$113$us) + ($ido))|0;
    $23 = (($k$111$us) + 1)|0;
    $exitcond24 = ($23|0)==($l1|0);
    if ($exitcond24) {
     break;
    } else {
     $k$111$us = $23;$t1$112$us = $21;$t2$113$us = $22;
    }
   }
  }
  $66 = (($ido|0) % 2)&-1;
  $67 = ($66|0)==(1);
  if ($67) {
   return;
  }
 }
 $68 = (($ido) + -1)|0;
 if (!($2)) {
  return;
 }
 $69 = (($0) + ($68))|0;
 $k$21 = 0;$t1$22 = $ido;$t2$23 = $69;$t3$14 = $68;
 while(1) {
  $70 = (($cc) + ($t2$23<<2)|0);
  $71 = +HEAPF32[$70>>2];
  $72 = -$71;
  $73 = (($ch) + ($t1$22<<2)|0);
  HEAPF32[$73>>2] = $72;
  $74 = (($cc) + ($t3$14<<2)|0);
  $75 = HEAP32[$74>>2]|0;
  $76 = (($t1$22) + -1)|0;
  $77 = (($ch) + ($76<<2)|0);
  HEAP32[$77>>2] = $75;
  $78 = (($t1$22) + ($1))|0;
  $79 = (($t2$23) + ($ido))|0;
  $80 = (($t3$14) + ($ido))|0;
  $81 = (($k$21) + 1)|0;
  $exitcond = ($81|0)==($l1|0);
  if ($exitcond) {
   break;
  } else {
   $k$21 = $81;$t1$22 = $78;$t2$23 = $79;$t3$14 = $80;
  }
 }
 return;
}