function _c68(_c6d,_c6e,_c6f){
var _c70=$.data(_c6d,"datebox");
var opts=_c70.options;
var _c71=_c70.calendar;
_c71.calendar("moveTo",opts.parser.call(_c6d,_c6e));
if(_c6f){
$(_c6d).combo("setValue",_c6e);
}else{
if(_c6e){
_c6e=opts.formatter.call(_c6d,_c71.calendar("options").current);
}
$(_c6d).combo("setText",_c6e).combo("setValue",_c6e);
}
}