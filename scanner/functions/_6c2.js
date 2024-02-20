function _6c2(_6c3){
$(_6c3).addClass("numberspinner-f");
var opts=$.data(_6c3,"numberspinner").options;
$(_6c3).numberbox($.extend({},opts,{doSize:false})).spinner(opts);
$(_6c3).numberbox("setValue",opts.value);
}