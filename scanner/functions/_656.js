function _656(_657,_658){
_658=_658||{};
var _659=$.data(_657,"form");
if(_659){
$.extend(_659.options,_658);
}else{
$.data(_657,"form",{options:$.extend({},$.fn.form.defaults,$.fn.form.parseOptions(_657),_658)});
}
}