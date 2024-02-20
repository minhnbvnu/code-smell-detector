function _575(_58a){
var opts=$(_58a).textbox("options");
var _58b=$(_58a).textbox("textbox");
_58b.validatebox($.extend({},opts,{deltaX:function(_58c){
return $(_58a).textbox("getTipX",_58c);
},deltaY:function(_58d){
return $(_58a).textbox("getTipY",_58d);
},onBeforeValidate:function(){
opts.onBeforeValidate.call(_58a);
var box=$(this);
if(!box.is(":focus")){
if(box.val()!==opts.value){
opts.oldInputValue=box.val();
box.val(opts.value);
}
}
},onValidate:function(_58e){
var box=$(this);
if(opts.oldInputValue!=undefined){
box.val(opts.oldInputValue);
opts.oldInputValue=undefined;
}
var tb=box.parent();
if(_58e){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
opts.onValidate.call(_58a,_58e);
}}));
}