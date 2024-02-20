function _ogg_stream_flush($os,$og) {
 $os = $os|0;
 $og = $og|0;
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_ogg_stream_flush_i($os,$og,1,4096)|0);
 return ($0|0);
}