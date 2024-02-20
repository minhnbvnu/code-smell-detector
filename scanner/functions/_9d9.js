function _9d9(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length||!tr.parent().length){
return;
}
var _9da=tr.attr("node-id");
var _9db=_9dc(tr);
if(tt.hasClass("tree-hit")){
_9dd(_9db,_9da);
}else{
if(tt.hasClass("tree-checkbox")){
_9de(_9db,_9da);
}else{
var opts=$(_9db).datagrid("options");
if(!tt.parent().hasClass("datagrid-cell-check")&&!opts.singleSelect&&e.shiftKey){
var rows=$(_9db).treegrid("getChildren");
var idx1=$.easyui.indexOfArray(rows,opts.idField,opts.lastSelectedIndex);
var idx2=$.easyui.indexOfArray(rows,opts.idField,_9da);
var from=Math.min(Math.max(idx1,0),idx2);
var to=Math.max(idx1,idx2);
var row=rows[idx2];
var td=tt.closest("td[field]",tr);
if(td.length){
var _9df=td.attr("field");
opts.onClickCell.call(_9db,_9da,_9df,row[_9df]);
}
$(_9db).treegrid("clearSelections");
for(var i=from;i<=to;i++){
$(_9db).treegrid("selectRow",rows[i][opts.idField]);
}
opts.onClickRow.call(_9db,row);
}else{
$.fn.datagrid.defaults.rowEvents.click(e);
}
}
}
}