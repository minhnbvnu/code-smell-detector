function _667(_668){
var _669=$.data(_668,"numberbox");
var opts=_669.options;
$(_668).addClass("numberbox-f").textbox(opts);
$(_668).textbox("textbox").css({imeMode:"disabled"});
$(_668).attr("numberboxName",$(_668).attr("textboxName"));
_669.numberbox=$(_668).next();
_669.numberbox.addClass("numberbox");
var _66a=opts.parser.call(_668,opts.value);
var _66b=opts.formatter.call(_668,_66a);
$(_668).numberbox("initValue",_66a).numberbox("setText",_66b);
}