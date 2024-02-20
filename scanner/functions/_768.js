function _768(e){
var _769=_75f(e.target);
var opts=$(_769).datagrid("options");
var td=$(e.target).closest("td[field]");
opts.onHeaderContextMenu.call(_769,e,td.attr("field"));
}