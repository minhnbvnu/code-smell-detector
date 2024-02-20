function _vorbis_block_init($v,$vb) {
 $v = $v|0;
 $vb = $vb|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $i$01 = 0, dest = 0, label = 0, sp = 0;
 var stop = 0;
 sp = STACKTOP;
 dest=$vb; stop=dest+112|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $0 = ((($vb)) + 64|0);
 HEAP32[$0>>2] = $v;
 $1 = ((($vb)) + 76|0);
 HEAP32[$1>>2] = 0;
 $2 = ((($vb)) + 68|0);
 HEAP32[$2>>2] = 0;
 $3 = HEAP32[$v>>2]|0;
 $4 = ($3|0)==(0);
 if ($4) {
  return 0;
 }
 $5 = (_calloc(1,72)|0);
 $6 = ((($vb)) + 104|0);
 HEAP32[$6>>2] = $5;
 $7 = ((($5)) + 4|0);
 HEAPF32[$7>>2] = -9999.0;
 $8 = ((($vb)) + 4|0);
 $9 = ((($5)) + 12|0);
 $10 = ((($5)) + 40|0);
 $i$01 = 0;
 while(1) {
  $11 = ($i$01|0)==(7);
  if ($11) {
   HEAP32[$10>>2] = $8;
   _oggpack_writeinit($8);
   $i$01 = 8;
   continue;
  } else {
   $12 = (_calloc(1,20)|0);
   $13 = (($9) + ($i$01<<2)|0);
   HEAP32[$13>>2] = $12;
   _oggpack_writeinit($12);
   $14 = (($i$01) + 1)|0;
   $exitcond = ($14|0)==(15);
   if ($exitcond) {
    break;
   } else {
    $i$01 = $14;
    continue;
   }
  }
 }
 return 0;
}