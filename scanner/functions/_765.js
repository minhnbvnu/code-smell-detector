function _765(e){
var _766=_75f(e.target);
var opts=$(_766).datagrid("options");
var cell=$(e.target).closest(".datagrid-cell");
if(cell.length){
var p1=cell.offset().left+5;
var p2=cell.offset().left+cell._outerWidth()-5;
var cond=opts.resizeHandle=="right"?(e.pageX>p2):(opts.resizeHandle=="left"?(e.pageX<p1):(e.pageX<p1||e.pageX>p2));
if(cond){
var _767=cell.parent().attr("field");
var col=_751(_766,_767);
if(col.resizable==false){
return;
}
$(_766).datagrid("autoSizeColumn",_767);
col.auto=false;
}
}
}