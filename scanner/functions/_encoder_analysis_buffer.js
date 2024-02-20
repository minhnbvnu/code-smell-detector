function _encoder_analysis_buffer($enc,$length) {
 $enc = $enc|0;
 $length = $length|0;
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($enc)) + 456|0);
 $1 = (_vorbis_analysis_buffer($0,$length)|0);
 return ($1|0);
}