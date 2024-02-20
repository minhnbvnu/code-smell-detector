function _76c(t,_782){
var tr=$(t).closest(_782||"tr.datagrid-row");
if(tr.length&&tr.parent().length){
return tr;
}else{
return undefined;
}
}