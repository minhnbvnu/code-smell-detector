function _c33(_c34){
var span=$(_c34).next();
span.unbind(".tagbox").bind("click.tagbox",function(e){
var opts=$(_c34).tagbox("options");
if(opts.disabled||opts.readonly){
return;
}
if($(e.target).hasClass("tagbox-remove")){
var _c35=parseInt($(e.target).parent().attr("tagbox-index"));
var _c36=$(_c34).tagbox("getValues");
if(opts.onBeforeRemoveTag.call(_c34,_c36[_c35])==false){
return;
}
opts.onRemoveTag.call(_c34,_c36[_c35]);
_c36.splice(_c35,1);
$(_c34).tagbox("setValues",_c36);
}else{
var _c37=$(e.target).closest(".tagbox-label");
if(_c37.length){
var _c35=parseInt(_c37.attr("tagbox-index"));
var _c36=$(_c34).tagbox("getValues");
opts.onClickTag.call(_c34,_c36[_c35]);
}
}
$(this).find(".textbox-text").focus();
}).bind("keyup.tagbox",function(e){
_c38(_c34);
}).bind("mouseover.tagbox",function(e){
if($(e.target).closest(".textbox-button,.textbox-addon,.tagbox-label").length){
$(this).triggerHandler("mouseleave");
}else{
$(this).find(".textbox-text").triggerHandler("mouseenter");
}
}).bind("mouseleave.tagbox",function(e){
$(this).find(".textbox-text").triggerHandler("mouseleave");
});
}