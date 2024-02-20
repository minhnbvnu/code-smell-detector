function _6d2(_6d3,_6d4){
var opts=$.data(_6d3,"timespinner").options;
if(_6d4!=undefined){
opts.highlight=_6d4;
}
var _6d5=opts.selections[opts.highlight];
if(_6d5){
var tb=$(_6d3).timespinner("textbox");
$(_6d3).timespinner("setSelectionRange",{start:_6d5[0],end:_6d5[1]});
tb.focus();
}
}