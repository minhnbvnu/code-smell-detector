function _b2d(_b2e,_b2f){
var opts=$.data(_b2e,"combobox").options;
var _b30=$(_b2e).combo("getValues");
var _b31=$.inArray(_b2f+"",_b30);
if(_b31>=0){
_b30.splice(_b31,1);
_b2c(_b2e,_b30);
}
}