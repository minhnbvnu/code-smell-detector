function _vorbis_encode_init_vbr($vi,$channels,$rate,$base_quality) {
 $vi = $vi|0;
 $channels = $channels|0;
 $rate = $rate|0;
 $base_quality = +$base_quality;
 var $$0 = 0, $$0$i$ph = 0, $$01$i = 0.0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $2 = 0, $3 = 0.0, $4 = 0.0, $5 = 0.0, $6 = 0, $7 = 0, $8 = 0.0, $9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($rate|0)<(1);
 if ($0) {
  $$0$i$ph = -131;
 } else {
  $1 = ((($vi)) + 28|0);
  $2 = HEAP32[$1>>2]|0;
  $3 = $base_quality;
  $4 = $3 + 9.9999999999999995E-8;
  $5 = $4;
  $6 = !($5 >= 1.0);
  $$01$i = $6 ? $5 : 0.99989998340606689;
  $7 = ((($2)) + 3416|0);
  HEAPF32[$7>>2] = $$01$i;
  $8 = $$01$i;
  $9 = ((($2)) + 3400|0);
  $10 = (_get_setup_template($channels,$rate,$8,0,$9)|0);
  $11 = ((($2)) + 3396|0);
  HEAP32[$11>>2] = $10;
  $12 = ($10|0)==(0|0);
  if ($12) {
   $$0$i$ph = -130;
  } else {
   _vorbis_encode_setup_setting($vi,$channels,$rate);
   $13 = ((($2)) + 3420|0);
   HEAP32[$13>>2] = 0;
   $14 = ((($2)) + 3464|0);
   HEAP32[$14>>2] = 1;
   $15 = (_vorbis_encode_setup_init($vi)|0);
   $16 = ($15|0)==(0);
   if ($16) {
    $$0 = 0;
    return ($$0|0);
   }
   _vorbis_info_clear($vi);
   $$0 = $15;
   return ($$0|0);
  }
 }
 _vorbis_info_clear($vi);
 $$0 = $$0$i$ph;
 return ($$0|0);
}