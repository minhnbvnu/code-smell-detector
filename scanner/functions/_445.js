function _445(_44e,_44f){
var _450=$.data(_44e,"menu");
if(_450){
if($(_44e).is(":visible")){
_425($(_44e));
if(_44f){
$(_44e).show();
}else{
_450.options.onHide.call(_44e);
}
}
}
return false;
}