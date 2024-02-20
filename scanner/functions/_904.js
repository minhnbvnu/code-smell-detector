function _904(_905){
var _906=_905?1:2;
var _907=$(_8fd).datagrid("getColumnFields",_905);
var _908=_8ff.rowIdPrefix+"-"+_906+"-"+_8fe;
var tr="<tr id=\""+_908+"\" class=\"datagrid-row\" datagrid-row-index=\""+_8fe+"\"></tr>";
if(_8fe>=data.rows.length){
if(data.rows.length){
opts.finder.getTr(_8fd,"","last",_906).after(tr);
}else{
var cc=_905?dc.body1:dc.body2;
cc.html("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"+tr+"</tbody></table>");
}
}else{
opts.finder.getTr(_8fd,_8fe+1,"body",_906).before(tr);
}
}