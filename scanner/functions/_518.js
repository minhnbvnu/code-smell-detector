function _518(_522,_523){
var _524=$.data(_522,"checkbox");
var opts=_524.options;
var _525=_524.checkbox;
_525.find(".checkbox-value")._propAttr("checked",_523);
var _526=_525.find(".checkbox-inner").css("display",_523?"":"none");
if(_523){
_526.addClass("checkbox-checked");
}else{
_526.removeClass("checkbox-checked");
}
if(opts.checked!=_523){
opts.checked=_523;
opts.onChange.call(_522,_523);
}
}