function _c8a(_c8b){
var opts=$.data(_c8b,"datetimebox").options;
var date=_c85(_c8b);
_c89(_c8b,opts.formatter.call(_c8b,date));
$(_c8b).combo("hidePanel");
}