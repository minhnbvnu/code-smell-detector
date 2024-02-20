function _9bc(_9bd){
var _9be=$.data(_9bd,"treegrid");
var opts=_9be.options;
$(_9bd).datagrid($.extend({},opts,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_9bf,_9c0){
_9cd(_9bd);
opts.onResizeColumn.call(_9bd,_9bf,_9c0);
},onBeforeSortColumn:function(sort,_9c1){
if(opts.onBeforeSortColumn.call(_9bd,sort,_9c1)==false){
return false;
}
},onSortColumn:function(sort,_9c2){
opts.sortName=sort;
opts.sortOrder=_9c2;
if(opts.remoteSort){
_9cc(_9bd);
}else{
var data=$(_9bd).treegrid("getData");
_9fb(_9bd,null,data);
}
opts.onSortColumn.call(_9bd,sort,_9c2);
},onClickCell:function(_9c3,_9c4){
opts.onClickCell.call(_9bd,_9c4,find(_9bd,_9c3));
},onDblClickCell:function(_9c5,_9c6){
opts.onDblClickCell.call(_9bd,_9c6,find(_9bd,_9c5));
},onRowContextMenu:function(e,_9c7){
opts.onContextMenu.call(_9bd,e,find(_9bd,_9c7));
}}));
var _9c8=$.data(_9bd,"datagrid").options;
opts.columns=_9c8.columns;
opts.frozenColumns=_9c8.frozenColumns;
_9be.dc=$.data(_9bd,"datagrid").dc;
if(opts.pagination){
var _9c9=$(_9bd).datagrid("getPager");
_9c9.pagination({pageNumber:opts.pageNumber,pageSize:opts.pageSize,pageList:opts.pageList,onSelectPage:function(_9ca,_9cb){
opts.pageNumber=_9ca;
opts.pageSize=_9cb;
_9cc(_9bd);
}});
opts.pageSize=_9c9.pagination("options").pageSize;
}
}