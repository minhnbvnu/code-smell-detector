function _55a(_55b,_55c){
var opts=$.data(_55b,"validatebox").options;
if(_55c!=undefined){
opts.disabled=_55c;
}
if(opts.disabled){
$(_55b).addClass("validatebox-disabled")._propAttr("disabled",true);
}else{
$(_55b).removeClass("validatebox-disabled")._propAttr("disabled",false);
}
}