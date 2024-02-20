function _4dc(_4dd,_4de){
var _4df=$.data(_4dd,"switchbutton");
var opts=_4df.options;
var _4e0=_4df.switchbutton;
var _4e1=_4e0.find(".switchbutton-value");
if(_4de){
opts.disabled=true;
$(_4dd).add(_4e1)._propAttr("disabled",true);
_4e0.addClass("switchbutton-disabled");
}else{
opts.disabled=false;
$(_4dd).add(_4e1)._propAttr("disabled",false);
_4e0.removeClass("switchbutton-disabled");
}
}