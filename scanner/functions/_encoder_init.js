function _encoder_init($num_ch,$sample_rate,$quality) {
 $num_ch = $num_ch|0;
 $sample_rate = +$sample_rate;
 $quality = +$quality;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $h_code = 0, $h_comm = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0;
 $h_comm = sp + 32|0;
 $h_code = sp;
 $0 = (_malloc(688)|0);
 $1 = ((($0)) + 408|0);
 _vorbis_info_init($1);
 $2 = (~~(($sample_rate)));
 (_vorbis_encode_init_vbr($1,$num_ch,$2,$quality)|0);
 $3 = ((($0)) + 440|0);
 _vorbis_comment_init($3);
 _vorbis_comment_add_tag($3,553008,553016);
 $4 = ((($0)) + 456|0);
 (_vorbis_analysis_init($4,$1)|0);
 $5 = ((($0)) + 568|0);
 (_vorbis_block_init($4,$5)|0);
 $6 = (_time((0|0))|0);
 _srand($6);
 $7 = (_rand()|0);
 (_ogg_stream_init($0,$7)|0);
 $8 = ((($0)) + 680|0);
 HEAP32[$8>>2] = 0;
 $9 = ((($0)) + 684|0);
 HEAP32[$9>>2] = 0;
 $10 = ((($0)) + 360|0);
 (_vorbis_analysis_headerout($4,$3,$10,$h_comm,$h_code)|0);
 (_ogg_stream_packetin($0,$10)|0);
 (_ogg_stream_packetin($0,$h_comm)|0);
 (_ogg_stream_packetin($0,$h_code)|0);
 $11 = ((($0)) + 392|0);
 $12 = (_ogg_stream_flush($0,$11)|0);
 $13 = ($12|0)==(0);
 if ($13) {
  STACKTOP = sp;return ($0|0);
 }
 $14 = ((($0)) + 396|0);
 $15 = ((($0)) + 404|0);
 $16 = ((($0)) + 400|0);
 while(1) {
  $17 = HEAP32[$9>>2]|0;
  $18 = HEAP32[$14>>2]|0;
  $19 = (($18) + ($17))|0;
  $20 = HEAP32[$15>>2]|0;
  $21 = (($19) + ($20))|0;
  $22 = ($21|0)==(0);
  if (!($22)) {
   $25 = HEAP32[$8>>2]|0;
   $26 = (_realloc($25,$21)|0);
   HEAP32[$8>>2] = $26;
   $27 = HEAP32[$9>>2]|0;
   $28 = (($26) + ($27)|0);
   $29 = HEAP32[$11>>2]|0;
   $30 = HEAP32[$14>>2]|0;
   _memcpy(($28|0),($29|0),($30|0))|0;
   $31 = (($30) + ($27))|0;
   HEAP32[$9>>2] = $31;
   $32 = (($26) + ($31)|0);
   $33 = HEAP32[$16>>2]|0;
   $34 = HEAP32[$15>>2]|0;
   _memcpy(($32|0),($33|0),($34|0))|0;
   $35 = (($34) + ($31))|0;
   HEAP32[$9>>2] = $35;
  }
  $23 = (_ogg_stream_flush($0,$11)|0);
  $24 = ($23|0)==(0);
  if ($24) {
   break;
  }
 }
 STACKTOP = sp;return ($0|0);
}