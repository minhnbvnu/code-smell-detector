function _encoder_clear($enc) {
 $enc = $enc|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 (_ogg_stream_clear($enc)|0);
 $0 = ((($enc)) + 568|0);
 (_vorbis_block_clear($0)|0);
 $1 = ((($enc)) + 456|0);
 _vorbis_dsp_clear($1);
 $2 = ((($enc)) + 440|0);
 _vorbis_comment_clear($2);
 $3 = ((($enc)) + 408|0);
 _vorbis_info_clear($3);
 $4 = ((($enc)) + 680|0);
 $5 = HEAP32[$4>>2]|0;
 _free($5);
 _free($enc);
 return;
}