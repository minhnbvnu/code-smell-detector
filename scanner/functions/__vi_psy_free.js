function __vi_psy_free($i) {
 $i = $i|0;
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($i|0)==(0|0);
 if (!($0)) {
  _free($i);
 }
 return;
}