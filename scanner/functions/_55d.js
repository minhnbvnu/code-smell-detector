function _55d(_55e,mode){
var opts=$.data(_55e,"validatebox").options;
opts.readonly=mode==undefined?true:mode;
if(opts.readonly||!opts.editable){
$(_55e).triggerHandler("blur.validatebox");
$(_55e).addClass("validatebox-readonly")._propAttr("readonly",true);
}else{
$(_55e).removeClass("validatebox-readonly")._propAttr("readonly",false);
}
}