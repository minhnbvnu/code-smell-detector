function _4cd(_4ce){
var _4cf=$.data(_4ce,"switchbutton");
var opts=_4cf.options;
var _4d0=_4cf.switchbutton;
var _4d1=_4d0.find(".switchbutton-inner");
var on=_4d1.find(".switchbutton-on").html(opts.onText);
var off=_4d1.find(".switchbutton-off").html(opts.offText);
var _4d2=_4d1.find(".switchbutton-handle").html(opts.handleText);
if(opts.reversed){
off.prependTo(_4d1);
on.insertAfter(_4d2);
}else{
on.prependTo(_4d1);
off.insertAfter(_4d2);
}
_4d0.find(".switchbutton-value")._propAttr("checked",opts.checked);
_4d0.removeClass("switchbutton-disabled").addClass(opts.disabled?"switchbutton-disabled":"");
_4d0.removeClass("switchbutton-reversed").addClass(opts.reversed?"switchbutton-reversed":"");
_4cc(_4ce,opts.checked);
_4d3(_4ce,opts.readonly);
$(_4ce).switchbutton("setValue",opts.value);
}