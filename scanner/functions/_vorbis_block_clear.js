function _vorbis_block_clear($vb) {
 $vb = $vb|0;
 var $$phi$trans$insert = 0, $$pre = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0, $27 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $i$01 = 0, $reap$01$i = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 $0 = ((($vb)) + 104|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($vb)) + 84|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ($3|0)==(0|0);
 if (!($4)) {
  $reap$01$i = $3;
  while(1) {
   $5 = ((($reap$01$i)) + 4|0);
   $6 = HEAP32[$5>>2]|0;
   $7 = HEAP32[$reap$01$i>>2]|0;
   _free($7);
   _free($reap$01$i);
   $8 = ($6|0)==(0|0);
   if ($8) {
    break;
   } else {
    $reap$01$i = $6;
   }
  }
 }
 $9 = ((($vb)) + 80|0);
 $10 = HEAP32[$9>>2]|0;
 $11 = ($10|0)==(0);
 $$phi$trans$insert = ((($vb)) + 68|0);
 $$pre = HEAP32[$$phi$trans$insert>>2]|0;
 if ($11) {
  $20 = $$pre;
 } else {
  $12 = ((($vb)) + 76|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = (($13) + ($10))|0;
  $15 = (_realloc($$pre,$14)|0);
  HEAP32[$$phi$trans$insert>>2] = $15;
  $16 = HEAP32[$9>>2]|0;
  $17 = HEAP32[$12>>2]|0;
  $18 = (($17) + ($16))|0;
  HEAP32[$12>>2] = $18;
  HEAP32[$9>>2] = 0;
  $20 = $15;
 }
 $19 = ((($vb)) + 72|0);
 HEAP32[$19>>2] = 0;
 HEAP32[$2>>2] = 0;
 $21 = ($20|0)==(0|0);
 if (!($21)) {
  _free($20);
 }
 $22 = ($1|0)==(0|0);
 if ($22) {
  dest=$vb; stop=dest+112|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
  return 0;
 } else {
  $i$01 = 0;
 }
 while(1) {
  $23 = (((($1)) + 12|0) + ($i$01<<2)|0);
  $24 = HEAP32[$23>>2]|0;
  _oggpack_writeclear($24);
  $25 = ($i$01|0)==(7);
  if ($25) {
   $i$01 = 8;
   continue;
  }
  $26 = HEAP32[$23>>2]|0;
  _free($26);
  $27 = (($i$01) + 1)|0;
  $exitcond = ($27|0)==(15);
  if ($exitcond) {
   break;
  } else {
   $i$01 = $27;
  }
 }
 _free($1);
 dest=$vb; stop=dest+112|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 return 0;
}