function __vp_global_free($look) {
 $look = $look|0;
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($look|0)==(0|0);
 if ($0) {
  return;
 }
 _free($look);
 return;
}