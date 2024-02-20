function _6cb(_6cc){
var opts=$.data(_6cc,"timespinner").options;
$(_6cc).addClass("timespinner-f").spinner(opts);
var _6cd=opts.formatter.call(_6cc,opts.parser.call(_6cc,opts.value));
$(_6cc).timespinner("initValue",_6cd);
}