function _20b(_20c){
var _20d=$.data(_20c,"tooltip");
if(_20d){
_1f5(_20c);
var opts=_20d.options;
if(_20d.tip){
_20d.tip.remove();
}
if(opts._title){
$(_20c).attr("title",opts._title);
}
$.removeData(_20c,"tooltip");
$(_20c).unbind(".tooltip").removeClass("tooltip-f");
opts.onDestroy.call(_20c);
}
}