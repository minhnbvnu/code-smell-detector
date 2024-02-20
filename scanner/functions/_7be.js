function _7be(_7c3){
var dc=$.data(_7c3,"datagrid").dc;
dc.view.find("div.datagrid-editable").each(function(){
var cell=$(this);
var _7c4=cell.parent().attr("field");
var col=$(_7c3).datagrid("getColumnOption",_7c4);
cell._outerWidth(col.boxWidth+col.deltaWidth-1);
var ed=$.data(this,"datagrid.editor");
if(ed.actions.resize){
ed.actions.resize(ed.target,cell.width());
}
});
}