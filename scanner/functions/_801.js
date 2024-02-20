function _801(_802,_803){
var _804=$.data(_802,"datagrid");
var opts=_804.options;
var rows=opts.finder.getRows(_802);
var _805=$.data(_802,"datagrid").selectedRows;
if(!_803&&opts.checkOnSelect){
_762(_802,true);
}
opts.finder.getTr(_802,"","allbody").addClass("datagrid-row-selected");
if(opts.idField){
for(var _806=0;_806<rows.length;_806++){
_6f5(_805,opts.idField,rows[_806]);
}
}
opts.onSelectAll.call(_802,rows);
}