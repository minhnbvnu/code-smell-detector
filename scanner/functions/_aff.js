function _aff(_b00,_b01){
var _b02=$.data(_b00,"combo");
var _b03=_b02.combo;
var opts=$(_b00).combo("options");
if(!$.isArray(_b01)){
_b01=_b01.split(opts.separator);
}
var _b04=_afa(_b00);
_b03.find(".textbox-value").remove();
if(_b01.length){
if(opts.multivalue){
for(var i=0;i<_b01.length;i++){
_b05(_b01[i]);
}
}else{
_b05(_b01.join(opts.separator));
}
}
function _b05(_b06){
var name=$(_b00).attr("textboxName")||"";
var _b07=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_b03);
_b07.attr("name",name);
if(opts.disabled){
_b07.attr("disabled","disabled");
}
_b07.val(_b06);
};
var _b08=(function(){
if(opts.onChange==$.parser.emptyFn){
return false;
}
if(_b04.length!=_b01.length){
return true;
}
for(var i=0;i<_b01.length;i++){
if(_b01[i]!=_b04[i]){
return true;
}
}
return false;
})();
if(_b08){
$(_b00).val(_b01.join(opts.separator));
if(opts.multiple){
opts.onChange.call(_b00,_b01,_b04);
}else{
opts.onChange.call(_b00,_b01[0],_b04[0]);
}
$(_b00).closest("form").trigger("_change",[_b00]);
}
}