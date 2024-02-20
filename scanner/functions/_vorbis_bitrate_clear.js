function _vorbis_bitrate_clear($bm) {
 $bm = $bm|0;
 var dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 dest=$bm; stop=dest+48|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 return;
}