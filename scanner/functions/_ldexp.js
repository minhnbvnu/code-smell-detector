function _ldexp($x,$n) {
 $x = +$x;
 $n = $n|0;
 var $0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (+_scalbn($x,$n));
 return (+$0);
}