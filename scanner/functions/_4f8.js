function _4f8(_505,_506){
var _507=$.data(_505,"radiobutton");
var opts=_507.options;
var _508=_507.radiobutton;
var rv=_508.find(".radiobutton-value");
opts.disabled=_506;
if(_506){
$(_505).add(rv)._propAttr("disabled",true);
_508.addClass("radiobutton-disabled");
}else{
$(_505).add(rv)._propAttr("disabled",false);
_508.removeClass("radiobutton-disabled");
}
}