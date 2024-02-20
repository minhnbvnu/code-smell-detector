function _vorbis_info_init($vi) {
 $vi = $vi|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 ;HEAP32[$vi>>2]=0|0;HEAP32[$vi+4>>2]=0|0;HEAP32[$vi+8>>2]=0|0;HEAP32[$vi+12>>2]=0|0;HEAP32[$vi+16>>2]=0|0;HEAP32[$vi+20>>2]=0|0;HEAP32[$vi+24>>2]=0|0;
 $0 = (_calloc(1,3664)|0);
 $1 = ((($vi)) + 28|0);
 HEAP32[$1>>2] = $0;
 return;
}