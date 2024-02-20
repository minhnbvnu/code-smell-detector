function _770(_7f4,_7f5){
var _7f6=$.data(_7f4,"datagrid");
var opts=_7f6.options;
opts.finder.getTr(_7f4,_7f6.highlightIndex).removeClass("datagrid-row-over");
opts.finder.getTr(_7f4,_7f5).addClass("datagrid-row-over");
_7f6.highlightIndex=_7f5;
}