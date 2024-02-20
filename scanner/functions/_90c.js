function _90c(_90d){
var _90e=_90d?1:2;
for(var i=_90a+1;i<data.rows.length;i++){
var tr=opts.finder.getTr(_909,i,"body",_90e);
tr.attr("datagrid-row-index",i-1);
tr.attr("id",_90b.rowIdPrefix+"-"+_90e+"-"+(i-1));
if(_90d&&opts.rownumbers){
var _90f=i;
if(opts.pagination){
_90f+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_90f);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i-1)%2?"datagrid-row-alt":"");
}
}
}