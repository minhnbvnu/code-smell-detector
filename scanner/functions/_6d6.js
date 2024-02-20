function _6d6(_6d7,_6d8){
var opts=$.data(_6d7,"timespinner").options;
var _6d8=opts.parser.call(_6d7,_6d8);
var text=opts.formatter.call(_6d7,_6d8);
$(_6d7).spinner("setValue",text);
}