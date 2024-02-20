function _39c(_39d,_39e){
var tool=$(_39d).find(">.tabs-header>.tabs-tool");
if(_39e){
tool.removeClass("tabs-tool-hidden").show();
}else{
tool.addClass("tabs-tool-hidden").hide();
}
$(_39d).tabs("resize").tabs("scrollBy",0);
}