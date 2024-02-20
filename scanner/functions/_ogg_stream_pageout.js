function _ogg_stream_pageout($os,$og) {
 $os = $os|0;
 $og = $og|0;
 var $$0 = 0, $$phi$trans$insert = 0, $$pre = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $force$0 = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($os|0)==(0|0);
 if ($0) {
  $$0 = 0;
  return ($$0|0);
 }
 $1 = HEAP32[$os>>2]|0;
 $2 = ($1|0)==(0|0);
 if ($2) {
  $$0 = 0;
  return ($$0|0);
 }
 $3 = ((($os)) + 328|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($4|0)==(0);
 $$phi$trans$insert = ((($os)) + 28|0);
 $$pre = HEAP32[$$phi$trans$insert>>2]|0;
 $phitmp = ($$pre|0)==(0);
 if ($5) {
  if ($phitmp) {
   $force$0 = 0;
  } else {
   $6 = ((($os)) + 332|0);
   $7 = HEAP32[$6>>2]|0;
   $8 = ($7|0)==(0);
   if ($8) {
    label = 7;
   } else {
    $force$0 = 0;
   }
  }
 } else {
  if ($phitmp) {
   $force$0 = 0;
  } else {
   label = 7;
  }
 }
 if ((label|0) == 7) {
  $force$0 = 1;
 }
 $9 = (_ogg_stream_flush_i($os,$og,$force$0,4096)|0);
 $$0 = $9;
 return ($$0|0);
}