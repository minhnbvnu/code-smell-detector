function _b05(_b06){
var name=$(_b00).attr("textboxName")||"";
var _b07=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_b03);
_b07.attr("name",name);
if(opts.disabled){
_b07.attr("disabled","disabled");
}
_b07.val(_b06);
}