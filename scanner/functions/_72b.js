function _72b(_72c,_72d){
var _72e=$.data(_72c,"datagrid");
var opts=_72e.options;
var dc=_72e.dc;
if(!dc.body2.children("table.datagrid-btable-frozen").length){
dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
}
_72f(true);
_72f(false);
_70c(_72c);
function _72f(_730){
var _731=_730?1:2;
var tr=opts.finder.getTr(_72c,_72d,"body",_731);
(_730?dc.body1:dc.body2).children("table.datagrid-btable-frozen").append(tr);
};
}