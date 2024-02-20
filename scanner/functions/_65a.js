function _65a(_65b){
if($.fn.validatebox){
var t=$(_65b);
t.find(".validatebox-text:not(:disabled)").validatebox("validate");
var _65c=t.find(".validatebox-invalid");
_65c.filter(":not(:disabled):first").focus();
return _65c.length==0;
}
return true;
}