function _c89(_c8c,_c8d,_c8e){
var opts=$.data(_c8c,"datetimebox").options;
$(_c8c).combo("setValue",_c8d);
if(!_c8e){
if(_c8d){
var date=opts.parser.call(_c8c,_c8d);
$(_c8c).combo("setText",opts.formatter.call(_c8c,date));
$(_c8c).combo("setValue",opts.formatter.call(_c8c,date));
}else{
$(_c8c).combo("setText",_c8d);
}
}
var date=opts.parser.call(_c8c,_c8d);
$(_c8c).datetimebox("calendar").calendar("moveTo",date);
$(_c8c).datetimebox("spinner").timespinner("setValue",_c8f(date));
function _c8f(date){
function _c90(_c91){
return (_c91<10?"0":"")+_c91;
};
var tt=[_c90(date.getHours()),_c90(date.getMinutes())];
if(opts.showSeconds){
tt.push(_c90(date.getSeconds()));
}
return tt.join($(_c8c).datetimebox("spinner").timespinner("options").separator);
};
}