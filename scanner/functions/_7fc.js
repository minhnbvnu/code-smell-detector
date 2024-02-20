function _7fc(_807,_808){
var _809=$.data(_807,"datagrid");
var opts=_809.options;
var rows=opts.finder.getRows(_807);
var _80a=$.data(_807,"datagrid").selectedRows;
if(!_808&&opts.checkOnSelect){
_763(_807,true);
}
opts.finder.getTr(_807,"","selected").removeClass("datagrid-row-selected");
if(opts.idField){
for(var _80b=0;_80b<rows.length;_80b++){
_6f4(_80a,opts.idField,rows[_80b][opts.idField]);
}
}
opts.onUnselectAll.call(_807,rows);
}