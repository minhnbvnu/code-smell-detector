function _629(_62a,_62b){
var opts=$.data(_62a,"form").options;
$.extend(opts,_62b||{});
var _62c=$.extend({},opts.queryParams);
if(opts.onSubmit.call(_62a,_62c)==false){
return;
}
var _62d=$(_62a).find(".textbox-text:focus");
_62d.triggerHandler("blur");
_62d.focus();
var _62e=null;
if(opts.dirty){
var ff=[];
$.map(opts.dirtyFields,function(f){
if($(f).hasClass("textbox-f")){
$(f).next().find(".textbox-value").each(function(){
ff.push(this);
});
}else{
ff.push(f);
}
});
_62e=$(_62a).find("input[name]:enabled,textarea[name]:enabled,select[name]:enabled").filter(function(){
return $.inArray(this,ff)==-1;
});
_62e._propAttr("disabled",true);
}
if(opts.ajax){
if(opts.iframe){
_62f(_62a,_62c);
}else{
if(window.FormData!==undefined){
_630(_62a,_62c);
}else{
_62f(_62a,_62c);
}
}
}else{
$(_62a).submit();
}
if(opts.dirty){
_62e._propAttr("disabled",false);
}
}