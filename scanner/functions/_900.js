function _900(_901){
var _902=_901?1:2;
for(var i=data.rows.length-1;i>=_8fe;i--){
var tr=opts.finder.getTr(_8fd,i,"body",_902);
tr.attr("datagrid-row-index",i+1);
tr.attr("id",_8ff.rowIdPrefix+"-"+_902+"-"+(i+1));
if(_901&&opts.rownumbers){
var _903=i+2;
if(opts.pagination){
_903+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_903);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i+1)%2?"datagrid-row-alt":"");
}
}
}