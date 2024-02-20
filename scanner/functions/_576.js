function _576(_598,_599){
var _59a=$.data(_598,"textbox");
var opts=_59a.options;
var tb=_59a.textbox;
var _59b=tb.find(".textbox-text");
var ss=$(_598).add(tb.find(".textbox-value"));
opts.disabled=_599;
if(opts.disabled){
_59b.blur();
_59b.validatebox("disable");
tb.addClass("textbox-disabled");
ss._propAttr("disabled",true);
$(_59a.label).addClass("textbox-label-disabled");
}else{
_59b.validatebox("enable");
tb.removeClass("textbox-disabled");
ss._propAttr("disabled",false);
$(_59a.label).removeClass("textbox-label-disabled");
}
}