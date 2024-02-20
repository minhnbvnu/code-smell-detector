function _519(_527,_528){
var _529=$.data(_527,"checkbox");
var opts=_529.options;
var _52a=_529.checkbox;
var rv=_52a.find(".checkbox-value");
opts.disabled=_528;
if(_528){
$(_527).add(rv)._propAttr("disabled",true);
_52a.addClass("checkbox-disabled");
}else{
$(_527).add(rv)._propAttr("disabled",false);
_52a.removeClass("checkbox-disabled");
}
}