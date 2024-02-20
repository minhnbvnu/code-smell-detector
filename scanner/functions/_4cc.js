function _4cc(_4d4,_4d5,_4d6){
var _4d7=$.data(_4d4,"switchbutton");
var opts=_4d7.options;
opts.checked=_4d5;
var _4d8=_4d7.switchbutton.find(".switchbutton-inner");
var _4d9=_4d8.find(".switchbutton-on");
var _4da=opts.reversed?(opts.checked?opts.marginWidth:0):(opts.checked?0:opts.marginWidth);
var dir=_4d9.css("float").toLowerCase();
var css={};
css["margin-"+dir]=-_4da+"px";
_4d6?_4d8.animate(css,200):_4d8.css(css);
var _4db=_4d8.find(".switchbutton-value");
var ck=_4db.is(":checked");
$(_4d4).add(_4db)._propAttr("checked",opts.checked);
if(ck!=opts.checked){
opts.onChange.call(_4d4,opts.checked);
}
}