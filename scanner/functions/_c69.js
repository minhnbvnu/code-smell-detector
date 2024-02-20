function _c69(_c6a){
var _c6b=$.data(_c6a,"datebox");
var opts=_c6b.options;
var _c6c=_c6b.calendar.calendar("options").current;
if(_c6c){
_c68(_c6a,opts.formatter.call(_c6a,_c6c));
$(_c6a).combo("hidePanel");
}
}